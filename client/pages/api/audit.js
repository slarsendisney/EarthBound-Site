// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import conductAudit from "../../utils/audit";
import greenFoundation from "../../utils/greenFoundation";

Number.prototype.toFixedNumber = function(digits, base){
    var pow = Math.pow(base||10, digits);
    return Math.round(this*pow) / pow;
  }

export default async function handler(req, res) {

  const results = await Promise.all([conductAudit(req.query.url), greenFoundation(req.query.url)]);
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
  res.status(200).json(payload);
}
