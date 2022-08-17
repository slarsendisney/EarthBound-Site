import initMondayClient from "monday-sdk-js";

export const MondayStorageKeys = {
  AUDIT_BOARD: "audit-board",
};

export const createAuditBoard = async (token, workspaceID, url) => {
  const strippedURL = url.replace(/(^\w+:|^)\/\//, "");
  const boardName = `${strippedURL} Audit | ${new Date().toISOString()}`;
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);
    const boardCreationQuery = `mutation {
      create_board(board_name: "${boardName}", board_kind: public, workspace_id: ${parseInt(workspaceID)}) {
        id
      }
    }`;
    const response = await mondayClient.api(boardCreationQuery);
    console.log(`✅ Created board ${response.data.create_board.id} in ${workspaceID} for url ${url}`);
    return response.data.create_board.id;
  } catch (err) {
    console.error(err);
  }
};

export const getColumnValue = async (token, itemId, columnId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const query = `query($itemId: [Int]) {
        items (ids: $itemId) {
          column_values(ids:$columnId) {
            value
          }
        }
      }`;
    const variables = { columnId, itemId };

    const response = await mondayClient.api(query, { variables });
    return response.data.items[0].column_values[0].value;
  } catch (err) {
    console.error(err);
  }
};

export const changeColumnValue = async (
  token,
  boardId,
  itemId,
  columnId,
  value
) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `mutation change_column_value($boardId: Int!, $itemId: Int!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
      `;
    const variables = { boardId, columnId, itemId, value };

    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (err) {
    console.error(err);
  }
};
