import { database } from "./intialiseFirebase";
import initMondayClient from "monday-sdk-js";
import { createAuditBoards } from "./monday-service";

const isActiveWorkspace = async (mondayClient, workspaceId) => {
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

export const getWorkspaceID = async (mondayClient) => {
  const uid = mondayClient.userId + "";
  const db = database();
  const doc = await db.collection("users").doc(uid).get();

  if (doc.exists) {
    const data = doc.data();
    const workspaceID = data.workspaceID;
    const isActive = await isActiveWorkspace(mondayClient, workspaceID);
    if (isActive) {
      console.log(`✅ Found workspaceID ${workspaceID} for user ${uid}`);
      return data;
    }
  }
  try {
    const workspaceCreationQuery = `
        mutation {
          create_workspace (name:"Eathbound.site Audits", kind: open, description: "🌳 Use these audit boards to understand the carbon impact of your webpages and learn how you can improve them. Audit collection created by Earthbound.site") {
            id
          }
        }`;
    const workspaceCreationResponse = await mondayClient.api(
      workspaceCreationQuery
    );
    const newWorkSpaceID = workspaceCreationResponse.data.create_workspace.id;
    const boards = await createAuditBoards(
      mondayClient,
      newWorkSpaceID
    );
    const data = {
      workspaceID: newWorkSpaceID,
      boards,
    };
    await db.collection("users").doc(uid).set(data);
    console.log(`✅ Created workspace ${newWorkSpaceID} for user ${uid}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
