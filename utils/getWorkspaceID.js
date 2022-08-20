import { database } from "./intialiseFirebase";
import { createAuditBoards, setUpItem } from "./monday-service";

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

export const getWorkspaceID = async (mondayClient, url) => {
  const uid = mondayClient.accountId + "";
  const db = database();
  const doc = await db.collection("accounts").doc(uid).get();

  if (doc.exists) {
    const data = doc.data();
    const workspaceID = data.workspaceID;
    const isActive = await isActiveWorkspace(mondayClient, workspaceID);
    if (isActive) {
      console.log(`✅ Found workspaceID ${workspaceID} for account ${uid}`);
      const itemId = await setUpItem(
        mondayClient,
        parseInt(data.boards.audits.id),
        data.boards.audits.groups.recent_audits_group.id,
        data.boards.audits.groups.outdated_audits_group.id,
        data.boards.audits.columns,
        url
      );

      return { ...data, itemId };
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
    console.log(`✅ Created workspace ${newWorkSpaceID} for account ${uid}`);
    const boards = await createAuditBoards(mondayClient, newWorkSpaceID);
    const data = {
      workspaceID: newWorkSpaceID,
      boards,
    };
    const result = await db.collection("accounts").doc(uid).set(data);

    const itemId = await setUpItem(
      mondayClient,
      parseInt(data.boards.audits.id),
      data.boards.audits.groups.recent_audits_group.id,
      data.boards.audits.groups.outdated_audits_group.id,
      data.boards.audits.columns,
      url
    );

    return { ...data, itemId };
  } catch (err) {
    console.error(err);
  }
};
