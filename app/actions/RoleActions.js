import * as types from './actionConstants';

export const storeRoleInfo = (data) => ({
  type: types.STORE_ROLE_INFO,
  data
});

export const removeRoleInfo = () => ({
  type: types.REMOVE_ROLE_INFO
});
