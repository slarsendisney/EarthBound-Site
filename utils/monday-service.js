export const fireNotification = async (mondayClient, target, message) => {
  try {
    const NotificationQuery = `mutation {
      create_notification (user_id: ${
        mondayClient.userId
      }, target_id: ${parseInt(
      target
    )}, text: ${message}, target_type: Project) {
        text
      }
    }`;
    await mondayClient.api(NotificationQuery);
    console.log(`✅ Sent notification to ${target}`);
  } catch {
    console.error(err);
  }
};

export const createAuditBoards = async (mondayClient, workspaceID) => {
  try {
    const boardCreationQuery = `mutation {
      audits: create_board(board_name: "🚀 Audit Results", board_kind: public, workspace_id: ${parseInt(
        workspaceID
      )}) {
        id
      }
      quickWins: create_board(board_name: "✌️ Quick Wins", board_kind: public, workspace_id: ${parseInt(
        workspaceID
      )}) {
        id
      }
    }`;

    const response = await mondayClient.api(boardCreationQuery);
    const boards = response.data;
    const auditBoard = boards.audits.id;
    const PopulateQuery = `mutation {
      audit_date: create_column(board_id: ${parseInt(
        auditBoard
      )}, title:"Date", description: "The date that the audit was triggered", column_type:date) {
        id
      }
      audit_trigger: create_column(board_id: ${parseInt(
        auditBoard
      )}, title:"Triggered By", description: "The person who triggered the audit", column_type:people) {
        id
      }
      audit_status: create_column(board_id: ${parseInt(
        auditBoard
      )}, title:"Audit Score", description: "Audit's overall carbon score", column_type:status) {
        id
      }
      audit_carbon_uncached: create_column(board_id: ${parseInt(
        auditBoard
      )}, title:"Carbon Produced (Uncached)", description: "Carbon produced by this webpage on an unchached visit.", column_type:text) {
        id
      }
      audit_carbon_cached: create_column(board_id: ${parseInt(
        auditBoard
      )}, title:"Carbon Produced (Cached)", description: "Carbon produced by this webpage on an cached visit.", column_type:text) {
        id
      }
      audit_hosting: create_column(board_id: ${parseInt(
        auditBoard
      )}, title:"Green Hosting", description: "Signifies whether the site is hosted on a green hosting provider.", column_type:checkbox) {
        id
      }
    }`;
    const populateResponse = await mondayClient.api(PopulateQuery);
    await fireNotification(
      mondayClient,
      auditBoard,
      "You triggered your first audit! Congrats! Wev've gone ahead and created the Earthbound.Site Workspace & Boards, visit the audit board now to see your audit results!"
    );
    const {
      audit_webpage,
      audit_status,
      audit_carbon_uncached,
      audit_carbon_cached,
      audit_hosting,
    } = populateResponse.data;

    boards.audits.groups = {
      audit_webpage,
      audit_status,
      audit_carbon_uncached,
      audit_carbon_cached,
      audit_hosting,
    };

    console.log(`✅ Created earthbound boards in ${workspaceID}`);
    return boards;
  } catch (err) {
    console.error(err);
  }
};

export const getColumnValue = async (mondayClient, itemId, columnId) => {
  try {
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

// export const changeColumnValue = async (
//   token,
//   boardId,
//   itemId,
//   columnId,
//   value
// ) => {
//   try {
//     const mondayClient = initMondayClient({ token });

//     const query = `mutation change_column_value($boardId: Int!, $itemId: Int!, $columnId: String!, $value: JSON!) {
//         change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
//           id
//         }
//       }
//       `;
//     const variables = { boardId, columnId, itemId, value };

//     const response = await mondayClient.api(query, { variables });
//     return response;
//   } catch (err) {
//     console.error(err);
//   }
// };
