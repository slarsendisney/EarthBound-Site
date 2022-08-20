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
    const url = columnValue.value;
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
          mondayData.boards.audits.groups.recent_audits_group.id,
          mondayData.boards.audits.groups.outdated_audits_group.id,
          mondayData.boards.audits.columns,
          auditReport,
          url,
          mondayData.itemId
        );
      }
    }
  }
  res.status(200).send("OK");
}
