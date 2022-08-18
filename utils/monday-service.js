export const fireNotification = async (mondayClient, target, message) => {
  try {
    const NotificationQuery = `mutation {
      create_notification (user_id: ${parseInt(
        mondayClient.userId
      )}, target_id: ${target}, text: "${message}", target_type: Project) {
        text
      }
    }`;
    await mondayClient.api(NotificationQuery);
    console.log(`✅ Sent notification to ${target}`);
  } catch {
    console.error(err);
  }
};

export const outdateAudit = async (
  mondayClient,
  boardId,
  auditsGroupID,
  outdatedGroupID,
  url
) => {
  const findExsisting = `query {
    boards (ids: ${parseInt(boardId)}) {
        items {
          id
          name
          group {
            id
          }
        }
    }
}`;
  const response = await mondayClient.api(findExsisting);
  const items = response.data.boards[0].items.filter(
    (item) => item.name === url && item.group.id === auditsGroupID
  );
  if (items.length > 0) {
    const itemId = items[0].id;
    const outdateQuery = `mutation {
      move_item_to_group (item_id: ${itemId}, group_id: "${outdatedGroupID}") {
        id
    }
    }`;
    await mondayClient.api(outdateQuery);
    console.log(`✅ Outdated audit ${url}`);
  } else {
    console.log(`😃 No old audit to outdate`);
  }
};

export const addAuditToBoard = async (
  mondayClient,
  boardId,
  auditsGroupID,
  outdatedGroupID,
  columns,
  audit,
  url
) => {
  await outdateAudit(
    mondayClient,
    boardId,
    auditsGroupID,
    outdatedGroupID,
    url
  );
  const date = audit.auditTimestamp.split("T")[0];
  const time = audit.auditTimestamp.split("T")[1].split(".")[0];
  let scores = [
    audit.hosting.green,
    audit.pagePerformance > 0.69,
    audit.pageWeight < 2.5,
  ];
  let scoreTasks = [
    "Switch to Green Hosting",
    "Investigate Page Performance",
    "Reduce Page Weight",
  ];
  const actionItems = [];
  scores.map(
    (item, index) => item !== true && actionItems.push(scoreTasks[index])
  );

  const score = scores.filter((item) => item === true).length;

  const columnData = {
    [columns.audit_trigger
      .id]: `{\\\"personsAndTeams\\\":[{\\\"id\\\":${mondayClient.userId},\\\"kind\\\":\\\"person\\\"}]}`,
    [columns.audit_status.id]: `{\\\"rating\\\" : ${score}}`,
    [columns.audit_performance.id]: `\\\"${Math.floor(
      audit.pagePerformance * 100
    )}\\\"`,
    [columns.audit_carbon_cached.id]: `\\\"${audit.carbonWithCache} gCO2\\\"`,
    [columns.audit_carbon_uncached.id]: `\\\"${audit.carbon} gCO2\\\"`,
    [columns.audit_weight.id]: `\\\"${audit.pageWeight}\\\"`,
    [columns.audit_date
      .id]: `{\\\"date\\\" : \\\"${date}\\\", \\\"time\\\" : \\\"${time}\\\"}`,
    [columns.audit_hosting
      .id]: `{\\\"checked\\\" : \\\"${audit.hosting.green}\\\"}`,
  };
  const columnValues = Object.keys(columnData)
    .map((key) => {
      return `\\\"${key}\\\" : ${columnData[key]}`;
    })
    .join(", ");

  const addAuditQuery = `mutation add_audit{
    create_item (board_id: ${boardId}, group_id: "${auditsGroupID}", item_name: "${url}") {
        id
    }
  }`;
  const response = await mondayClient.api(addAuditQuery);
  // console.log(response);
  const itemId = response.data.create_item.id;

  const addPopulateAudit = `mutation populate_audit{
    change_multiple_column_values(item_id: ${itemId}, board_id: ${boardId}, column_values: "{${columnValues}}") {
      id
    }
    ${
      actionItems.length > 0
        ? `${actionItems
            .map(
              (action, i) => `
          action_item_${i}: create_subitem (parent_item_id: ${itemId}, item_name: "${action}") {
            id
            board {
                id
            }
          }
    `
            )
            .join("")}`
        : ""
    }
  }`;

  // console.log(addPopulateAudit);

  const popResponse = await mondayClient.api(addPopulateAudit);
  // console.log(popResponse);
  console.log(`✅ Added audit ${url}`);
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
    const auditBoard = parseInt(boards.audits.id);
    const PopulateQuery = `mutation {
      audit_date: create_column(board_id: ${auditBoard}, title:"Date", description: "The date that the audit was triggered", column_type:date) {
        id
        type
      }
      audit_trigger: create_column(board_id: ${auditBoard}, title:"Triggered By", description: "The person who triggered the audit", column_type:people) {
        id
        type
      }
      audit_status: create_column(board_id: ${auditBoard}, title:"Audit Score", description: "Audit's overall green score", column_type:rating) {
        id
        type
      }
      audit_carbon_uncached: create_column(board_id: ${auditBoard}, title:"Carbon Produced (Uncached)", description: "Carbon produced by this webpage on an unchached visit.", column_type:text) {
        id
        type
      }
      audit_carbon_cached: create_column(board_id: ${auditBoard}, title:"Carbon Produced (Cached)", description: "Carbon produced by this webpage on an cached visit.", column_type:text) {
        id
        type
      }
      audit_hosting: create_column(board_id: ${auditBoard}, title:"Green Hosting", description: "Signifies whether the site is hosted on a green hosting provider.", column_type:checkbox) {
        id
        type
      }
      audit_weight: create_column(board_id: ${auditBoard}, title:"Page Weight", description: "The weight of the page in MB.", column_type:numbers) {
        id
        type
      }
      audit_performance: create_column(board_id: ${auditBoard}, title:"Performance", description: "Signifies how performant your site is.", column_type:numbers) {
        id
        type
      }
      outdated_audits_group: create_group (board_id: ${auditBoard}, group_name: "Outdated Audits") {
        id
      }
      recent_audits_group: create_group (board_id: ${auditBoard}, group_name: "Recent Audits") {
        id
      }
      delete_group (board_id: ${auditBoard}, group_id: "topics") {
        id
        deleted
    }
    }`;
    const populateResponse = await mondayClient.api(PopulateQuery);
    console.log(populateResponse);
    const notification = await fireNotification(
      mondayClient,
      auditBoard,
      "You triggered your first audit! Congrats! We have gone ahead and created the Earthbound.Site Workspace & Boards, visit the audit board now to see your audit results!"
    );
    const {
      audit_date,
      audit_trigger,
      audit_status,
      audit_carbon_uncached,
      audit_carbon_cached,
      audit_hosting,
      audit_weight,
      audit_performance,
      outdated_audits_group,
      recent_audits_group,
    } = populateResponse.data;

    boards.audits.columns = {
      audit_date,
      audit_trigger,
      audit_status,
      audit_carbon_uncached,
      audit_carbon_cached,
      audit_hosting,
      audit_weight,
      audit_performance,
    };
    boards.audits.groups = {
      outdated_audits_group,
      recent_audits_group,
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
