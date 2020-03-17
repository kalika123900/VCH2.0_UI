import * as types from './actionConstants';

export const storePersonalDetailsInfo = (data) => ({
    type: types.STORE_PERSONAL_DETAILS_INFO,
    data
});
export const storeSkillsInterestsInfo = (data) => ({
    type: types.STORE_SKILLS_INTERESTS_INFO,
    data
});
export const storeEducationInfo = (data) => ({
    type: types.STORE_EDUCATION_INFO,
    data
});
export const storeExperienceInfo = (data) => ({
    type: types.STORE_EXPERIENCE_INFO,
    data
});
