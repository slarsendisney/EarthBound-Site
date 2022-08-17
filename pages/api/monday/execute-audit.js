import { getWorkspaceID } from "../../../utils/getWorkspaceID";
import { isValidUrl } from "../../../utils/isValidURL";
import initMondayClient from "monday-sdk-js";

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
      const mondayClient = initMondayClient();
      mondayClient.setToken(shortLivedToken);
      mondayClient.userId = userId;

      const results = await Promise.all([getWorkspaceID(mondayClient), audit(url)])
      console.log(results);
      // console.log(data)
      res.status(200).send("OK");
    } else {
      res.status(200).send("OK");
    }
  } else {
    res.status(200).send("OK");
  }
}
