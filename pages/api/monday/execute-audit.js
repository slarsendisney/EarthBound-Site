import { getWorkspaceID } from "../../../utils/getWorkspaceID";
import { isValidUrl } from "../../../utils/isValidURL";
import { createAuditBoard } from "../../../utils/monday-service";

const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { authorization } = req.headers;
  const { shortLivedToken, userId } = jwt.verify(
    authorization,
    process.env.MONDAY_SIGNING_SECRET
  );

  const { payload } = req.body;
  const {
    inputFields: { columnValue },
  } = payload;

  if (columnValue) {
    const url = columnValue.value;
    if (isValidUrl(url)) {
      const workspaceID = await getWorkspaceID(shortLivedToken, userId+"");
      const board = await createAuditBoard(shortLivedToken, workspaceID, url);
      console.log(board);
      // const data = await audit(url);
      // console.log(data)
      res.status(200).send("OK");
    } else {
      res.status(200).send("OK");
    }
  } else {
    res.status(200).send("OK");
  }
}
