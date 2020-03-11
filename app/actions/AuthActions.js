import * as types from './actionConstants';

export const setAuth = (data) => ({
  type: types.SET_AUTH,
  data
});
export const removeAuth = () => ({
  type: types.REMOVE_AUTH
});
