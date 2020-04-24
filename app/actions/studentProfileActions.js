import * as types from './actionConstants';

export const storeProfileDetails = (data) => ({
  type: types.STORE_PROFILE_DETAILS,
  data
});

export const storeLanguage = (data) => ({
  type: types.STORE_LANGUAGE,
  data
});

export const storeSkillInterests = (data) => ({
  type: types.STORE_SKILL_INTERESTS,
  data
});

export const storeEducation = (data) => ({
  type: types.STORE_EDUCATION,
  data
});

export const storeExperience = (data) => ({
  type: types.STORE_EXPERIENCE,
  data
});

export const warnMsgInit = (data) => ({
  type: types.WARN_MSG_INIT,
  data
});

export const warnMsgRemove = () => ({
  type: types.WARN_MSG_INIT
});

