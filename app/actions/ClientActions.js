import * as types from './actionConstants';

export const clientLoggedIn = () => ({
  type: types.CLIENT_LOGGED_IN
});

export const clientLoggedOut = () => ({
  type: types.CLIENT_LOGGED_OUT
});