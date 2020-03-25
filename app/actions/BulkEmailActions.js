import * as types from './actionConstants';

export const emailStep1Info = (data) => ({
  type: types.EMAIL_STEP1_INFO,
  data
});

export const emailStep2Info = (data) => ({
  type: types.EMAIL_STEP2_INFO,
  data
});

export const emailStep3Info = (data) => ({
  type: types.EMAIL_STEP3_INFO,
  data
});

export const emailStep4Info = (data) => ({
  type: types.EMAIL_STEP4_INFO,
  data
});

export const emailStep5Info = (data) => ({
  type: types.EMAIL_STEP5_INFO,
  data
});

export const emailStep6Info = (data) => ({
  type: types.EMAIL_STEP6_INFO,
  data
});

export const emailInfoInit = (data) => ({
  type: types.EMAIL_INFO_INIT,
  data
});

export const emailInfoRemove = () => ({
  type: types.EMAIL_INFO_REMOVE
});

export const emailInitMsg = (data) => ({
  type: types.EMAIL_INIT_MSG,
  data
});

export const emailRemoveMsg = (data) => ({
  type: types.EMAIL_REMOVE_MSG,
  data
});
