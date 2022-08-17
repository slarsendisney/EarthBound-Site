import audit from "../../utils/audit";

export default async function handler(req, res) {
  const url = req.query.url;
  const payload = await audit(url);
  res.status(200).json(payload);
}
