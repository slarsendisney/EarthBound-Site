import greenFoundation from "./greenFoundation";

const APIKEY = process.env.GOOGLEPAGESPEED_APIKEY;

Number.prototype.toFixedNumber = function(digits, base){
  var pow = Math.pow(base||10, digits);
  return Math.round(this*pow) / pow;
}


const addProtocolIfMissing = (url) => {
  if (!url.startsWith("http")) {
    return `https://${url}`;
  }
  return url;
};

const conductAudit = async (url) => {
  const response = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${addProtocolIfMissing(
      url
    )}&key=${APIKEY}`
  );
  const data = await response.json();
  return data;
};

const audit = async (auditURL) => {
  const results = await Promise.all([conductAudit(auditURL), greenFoundation(auditURL)]);
  const {
    lighthouseResult: {
      audits,
      categories: { performance },
      timing: { total },
    },
    analysisUTCTimestamp,
    stackPacks,
  } = results[0];

  const {hosted_by_id, url, partner, modified, ...hostingInfo} = results[1];

  const MBWeight = (audits["total-byte-weight"].numericValue /1024 / 1024)

  const cachedWeight = (MBWeight - (audits["uses-long-cache-ttl"].numericValue /1024 / 1024))

  const potentialImageSavings = (audits["uses-responsive-images"].details.overallSavingsBytes /1024 / 1024).toFixedNumber(2)
  
  const payload = {
    auditTimestamp: analysisUTCTimestamp,
    duration: total,
    pageWeight:MBWeight.toFixedNumber(2),
    pagePerformance: performance.score,
    stackPacks,
    hosting: hostingInfo,
    carbon: (MBWeight * 10).toFixedNumber(2),
    carbonWithCache: ((MBWeight * 10 - cachedWeight * 10)+0.5).toFixedNumber(2),
    potentialImageSavings,
    fullAudit: audits,
  };
  return payload;
}

export default audit;
