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
    inputFields: { columnId, boardId },
  } = payload;

  console.log({ columnId, boardId });

 
  res.status(200).send("OK");
}
