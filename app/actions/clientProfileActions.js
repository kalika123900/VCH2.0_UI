import * as types from './actionConstants';

export const clientProfileDetails = (data) => ({
    type: types.CLIENT_PROFILE_DETAILS,
    data
});

export const clientProfileInit = (data) => ({
    type: types.CLIENT_PROFILE_INIT,
    data
});