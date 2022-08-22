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

export const setUpItem = async (
  mondayClient,
  boardId,
  auditsGroupID,
  outdatedGroupID,
  columns,
  url
) => {
  await outdateAudit(
    mondayClient,
    boardId,
    auditsGroupID,
    outdatedGroupID,
    url
  );
  const addAuditQuery = `mutation add_audit{
    create_item (board_id: ${boardId}, group_id: "${auditsGroupID}", item_name: "${url.replace(
    /(^\w+:|^)\/\//,
    ""
  )}") {
        id
    }
  }`;
  const response = await mondayClient.api(addAuditQuery);

  const itemId = response.data.create_item.id;

  const columnData = {
    [columns.audit_progress.id]: `{\\\"index\\\" : 0}`,
  };
  const columnValues = Object.keys(columnData)
    .map((key) => {
      return `\\\"${key}\\\" : ${columnData[key]}`;
    })
    .join(", ");

  const addPopulateAudit = `mutation populate_audit{
      change_multiple_column_values(item_id: ${itemId}, board_id: ${boardId}, column_values: "{${columnValues}}") {
        id
      }
    }`;
  console.log(addPopulateAudit);
  const popResponse = await mondayClient.api(addPopulateAudit);
  console.log(`✅ Added item ${itemId} to audit board`);

  return itemId;
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
  columns,
  audit,
  url,
  itemId,
  taskBoardId,
  taskGroups
) => {
  const date = audit.auditTimestamp.split("T")[0];
  const time = audit.auditTimestamp.split("T")[1].split(".")[0];
  console.log({ hosting: audit.hosting });
  let scores = [
    audit.hosting.green === true,
    audit.pagePerformance > 0.69,
    audit.pageWeight < 2.5,
    audit.carbonWithCache / audit.carbon < 0.3,
  ];

  let taskGroupIds = [
    taskGroups.tasks_green_hosting_group,
    taskGroups.tasks_performance_group,
    taskGroups.tasks_page_weight_group,
    taskGroups.tasks_caching_group,
  ];
  let scoreTasks = [
    "Switch to Green Hosting",
    "Improve Page Performance",
    "Reduce Page Weight",
    "Increase Cached Resources",
  ];
  let scoreDesc = [
    "switching will reduce the amount of energy used by your server.",
    "making your page more performant will reduce the amount of energy used by the client.",
    "reducing the page weight will reduce the amount of energy required to send your webpage to the client.",
    "increasing the amount of cached resources will reduce the amount of data that you will need to send to a client on a repeat visit.",
  ];

  const updateItems = [];
  for await (const [index, item] of scores.entries()) {
    if (item !== true) {
      const itemName = url.replace(/(^\w+:|^)\/\//, "");
      const checkExistQuery = `query {
        boards(ids: ${taskBoardId}) {
          id
          groups(ids:"${taskGroupIds[index].id}") {
            id
            items{
              name
              id
            }
          }
        }
      }`;
      const checkExistData = await mondayClient.api(checkExistQuery);
      const items = checkExistData.data.boards[0].groups[0].items.filter(
        (item) => item.name === itemName
      ).length;
      if (items === 0) {
        const addAuditQuery = `mutation {
        create_item (board_id: ${taskBoardId}, group_id: "${taskGroupIds[index].id}", item_name: "${itemName}") {
            id
        }
      }`;
        const groupItem = await mondayClient.api(addAuditQuery);
        const itemId = groupItem.data.create_item.id;
        updateItems.push(
          `<li><b><a href=\\\"/boards/${taskBoardId}/pulses/${itemId}\\\">${scoreTasks[index]}</a></b>: ${scoreDesc[index]} </li>`
        );
      } else {
        updateItems.push(
          `<li><b><a href=\\\"/boards/${taskBoardId}/pulses/${items[0].id}\\\">${scoreTasks[index]}</a></b>: ${scoreDesc[index]} </li>`
        );
      }
    }
  }

  const score = scores.filter((item) => item === true).length + 1;

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
    [columns.audit_progress.id]: `{\\\"index\\\" : 1}`,
  };
  const columnValues = Object.keys(columnData)
    .map((key) => {
      return `\\\"${key}\\\" : ${columnData[key]}`;
    })
    .join(", ");

  const addPopulateAudit = `mutation populate_audit{
    change_multiple_column_values(item_id: ${itemId}, board_id: ${boardId}, column_values: "{${columnValues}}") {
      id
    }
    ${
      updateItems.length > 0
        ? `
    create_update (item_id: ${itemId}, body: "EarthBound's suggested improvements: \n <ul>${updateItems.join(
            ""
          )}</ul> \n You can click on any of these to see the created task.") {
      id
    }`
        : ``
    }
  }`;
  const popResponse = await mondayClient.api(addPopulateAudit);
  console.log(popResponse);
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
      tasks: create_board(board_name: "🔧 Suggested Tasks", board_kind: public, workspace_id: ${parseInt(
        workspaceID
      )}) {
        id
      }
    }`;

    const response = await mondayClient.api(boardCreationQuery);
    console.log(response);
    const boards = response.data;
    const auditBoard = parseInt(boards.audits.id);
    const tasksBoard = parseInt(boards.tasks.id);
    const PopulateQuery = `mutation {
      audit_date: create_column(board_id: ${auditBoard}, title:"Date", description: "The date that the audit was triggered", column_type:date) {
        id
        type
      }
      audit_trigger: create_column(board_id: ${auditBoard}, title:"Triggered By", description: "The person who triggered the audit", column_type:people) {
        id
        type
      }
      audit_progress: create_column(board_id: ${auditBoard}, title:"Audit Status", description: "Whether the audit is in progress.", column_type:status) {
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
      outdated_audits_group: create_group (board_id: ${auditBoard}, group_name: "Outdated Audits") {
        id
      }
      tasks_green_hosting_group: create_group (board_id: ${tasksBoard}, group_name: "Switch to Green Hosting") {
        id
      }
      tasks_performance_group: create_group (board_id: ${tasksBoard}, group_name: "Improve Page Performance") {
        id
      }
      tasks_page_weight_group: create_group (board_id: ${tasksBoard}, group_name: "Reduce Page Weight") {
        id
      }
      tasks_caching_group: create_group (board_id: ${tasksBoard}, group_name: "Increase Cached Resources") {
        id
      }
      task_owner: create_column(board_id: ${tasksBoard}, title:"Owner", description: "The person who will own the task", column_type:people) {
        id
        type
      }
      task_status: create_column(board_id: ${tasksBoard}, title:"Status", description: "The progress to task completion", column_type:status) {
        id
        type
      }
      task_date: create_column(board_id: ${tasksBoard}, title:"Start Date", description: "Task start date", column_type:date) {
        id
        type
      }
      audits_deletion_legacy_group: delete_group (board_id: ${auditBoard}, group_id: "topics") {
        id
        deleted
      }
      tasks_deletion_legacy_group: delete_group (board_id: ${tasksBoard}, group_id: "topics") {
        id
        deleted
      }
    }`;
    const populateResponse = await mondayClient.api(PopulateQuery);
    console.log(populateResponse);
    const notification = await fireNotification(
      mondayClient,
      auditBoard,
      "You triggered your first audit! Congrats! We have gone ahead and created the Earthbound Workspace & Boards, visit the audit board now to see your audit results!"
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
      audit_progress,
      tasks_green_hosting_group,
      tasks_performance_group,
      tasks_page_weight_group,
      tasks_caching_group,
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
      audit_progress,
    };
    boards.tasks.groups = {
      tasks_green_hosting_group,
      tasks_performance_group,
      tasks_page_weight_group,
      tasks_caching_group,
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
