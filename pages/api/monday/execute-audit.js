import { getWorkspaceID } from "../../../utils/getWorkspaceID";
import { isValidUrl } from "../../../utils/isValidURL";
import initMondayClient from "monday-sdk-js";
import audit from "../../../utils/audit";
import { addAuditToBoard } from "../../../utils/monday-service";

const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { authorization } = req.headers;
  const { shortLivedToken, accountId } = jwt.verify(
    authorization,
    process.env.MONDAY_SIGNING_SECRET
  );

  const { payload } = req.body;
  const {
    inputFields: { columnValue, userId },
  } = payload;

  if (columnValue) {
    const value = columnValue.value;
    const text = columnValue.text;

    console.log({ text, value });
    const url = value
    if (isValidUrl(url)) {
      console.log(`🚀 Incoming request to audit ${url}`);
      const mondayClient = initMondayClient();
      mondayClient.setToken(shortLivedToken);
      mondayClient.userId = userId;
      mondayClient.accountId = accountId;

      const [mondayData, auditReport] = await Promise.all([
        getWorkspaceID(mondayClient, url),
        audit(url),
      ]);
      if(auditReport){
        await addAuditToBoard(
          mondayClient,
          parseInt(mondayData.boards.audits.id),
          mondayData.boards.audits.columns,
          auditReport,
          url,
          mondayData.itemId,
          parseInt(mondayData.boards.tasks.id),
          mondayData.boards.tasks.groups
        );
      }
    }
  }
  res.status(200).send("OK");
}
