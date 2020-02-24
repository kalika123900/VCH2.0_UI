import * as types from './actionConstants';

export const fetchRoleAction = items => ({
  type: types.FETCH_ROLE_DATA,
  items,
});

export const showDetailRoleAction = item => ({
  type: types.SHOW_DETAIL_ROLE,
  item,
});

export const submitRoleAction = (item) => ({
  type: types.SUBMIT_ROLE,
  item
});

export const editRoleAction = item => ({
  type: types.EDIT_ROLE,
  item,
});

export const removeRoleAction = item => ({
  type: types.DELETE_ROLE,
  item,
});

export const hideDetailRoleAction = {
  type: types.HIDE_DETAIL_ROLE,
};

export const addRoleAction = {
  type: types.ADD_ROLE,
};

export const closeRoleAction = {
  type: types.CLOSE_ROLE_FORM,
};

export const closeRoleNotifAction = {
  type: types.CLOSE_NOTIF_ROLE
};
