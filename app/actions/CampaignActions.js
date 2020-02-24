import * as types from './actionConstants';

export const storeStep1Info = (data) => ({
  type: types.STORE_STEP1_INFO,
  data
});

export const storeStep2Info = (data) => ({
  type: types.STORE_STEP2_INFO,
  data
});

export const storeStep3Info = (data) => ({
  type: types.STORE_STEP3_INFO,
  data
});

export const storeStep4Info = (data) => ({
  type: types.STORE_STEP4_INFO,
  data
});

export const storeStep5Info = (data) => ({
  type: types.STORE_STEP5_INFO,
  data
});

export const storeStep6Info = (data) => ({
  type: types.STORE_STEP6_INFO,
  data
});

export const removeCampaignInfo = () => ({
  type: types.REMOVE_CAMPAIGN_INFO
});