import * as types from './actionConstants';

export const fetchAction = (items, branch) => ({
  branch,
  type: `${branch}/${types.FETCH_DATA_FORM}`,
  items
});
export const addAction = (anchor, branch) => ({
  branch,
  type: `${branch}/${types.ADD_NEW}`,
  anchor
});
export const closeAction = branch => ({
  branch,
  type: `${branch}/${types.CLOSE_FORM}`
});
export const submitAction = (newData, branch) => ({
  branch,
  type: `${branch}/${types.SUBMIT_DATA}`,
  newData
});
export const removeAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.REMOVE_ROW_FORM}`,
  item
});
export const editAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.EDIT_ROW_FORM}`,
  item
});
export const closeNotifAction = branch => ({
  branch,
  type: `${branch}/${types.CLOSE_NOTIF}`,
});
