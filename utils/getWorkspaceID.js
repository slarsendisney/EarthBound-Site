import { database } from "./intialiseFirebase";
import initMondayClient from "monday-sdk-js";

const isActiveWorkspace = async (token, workspaceId) => {
  const mondayClient = initMondayClient();
  mondayClient.setToken(token);
  const boardCreationQuery = `query {
        boards {
          workspace_id
        }
      }`;
  const response = await mondayClient.api(boardCreationQuery);
  const workspaces = new Set();
  response.data.boards.forEach((board) => {
    workspaces.add(board.workspace_id);
  });
  return workspaces.has(workspaceId);
};

export const getWorkspaceID = async (token, uid) => {
  const db = database();
  const doc = await db.collection("users").doc(uid).get();

  if (doc.exists) {
    const data = doc.data();
    const workspaceID = data.workspaceID;
    const isActive = await isActiveWorkspace(token, workspaceID);
    if (isActive) {
      console.log(`✅ Found workspaceID ${workspaceID} for user ${uid}`);
      return workspaceID;
    }
  }
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);
    const workspaceCreationQuery = `
        mutation {
          create_workspace (name:"Eathbound.site Audits", kind: open, description: "🌳 Use these audit boards to understand the carbon impact of your webpages and learn how you can improve them. Audit collection created by Earthbound.site") {
            id
          }
        }`;
    const workspaceCreationResponse = await mondayClient.api(
      workspaceCreationQuery
    );
    console.log(workspaceCreationResponse);
    const newWorkSpaceID = workspaceCreationResponse.data.create_workspace.id;

    await db.collection("users").doc(uid).set({
      workspaceID: newWorkSpaceID,
    });
    console.log(`✅ Created workspace ${newWorkSpaceID} for user ${uid}`);
    return newWorkSpaceID;
  } catch (err) {
    console.error(err);
  }
};
