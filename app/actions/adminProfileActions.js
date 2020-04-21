import * as types from './actionConstants';

export const adminProfileDetails = (data) => ({
  type: types.ADMIN_PROFILE_DETAILS,
  data
});

export const adminProfileInit = (data) => ({
  type: types.ADMIN_PROFILE_INIT,
  data
});