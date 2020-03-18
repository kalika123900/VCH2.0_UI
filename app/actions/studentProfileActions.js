import * as types from './actionConstants';

export const storeProfileDetails = (data) => ({
  type: types.STORE_PROFILE_DETAILS,
  data
});

export const storeSkillInterests = (data) => ({
  type: types.STORE_SKILL_INTERESTS,
  data
});

export const storeEducationData = (data) => ({
  type: types.STORE_EDUCATION_DATA,
  data
});

export const storeExperience = (data) => ({
  type: types.STORE_EXPERIENCE,
  data
});

export const studentProfileInit = (data) => ({
  type: types.STUDENT_PROFILE_INIT,
  data
});


