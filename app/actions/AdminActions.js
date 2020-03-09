import * as types from './actionConstants';

export const adminLoggedIn = () => ({
  type: types.ADMIN_LOGGED_IN
});

export const adminLoggedOut = () => ({
  type: types.ADMIN_LOGGED_OUT
});