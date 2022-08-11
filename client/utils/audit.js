const APIKEY = process.env.GOOGLEPAGESPEED_APIKEY;

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

export default conductAudit;
