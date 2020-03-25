import { fromJS, List } from 'immutable';
import {
  STORE_PROFILE_DETAILS,
  STORE_SKILL_INTERESTS,
  STORE_EDUCATION,
  STORE_EXPERIENCE,
  WARN_MSG_INIT,
  WARN_MSG_REMOVE
} from 'dan-actions/actionConstants';
import { DateHelper } from '../helpers/dateTimeHelper';

const initialState = {
  warnMsg: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dob: DateHelper.format(DateHelper.addDays(new Date(), -6580)),
  gender: '',
  ethnicity: '',
  nationality: '',
  keywords: List([]),
  intrestedIndustries: List([]),
  intrestedCompanies: List([]),
  skills: List([]),
  oldSkills: List([]),
  resume: List([]),
  educationInfo: List([{
    id: null,
    type: '',
    university_qualification: '',
    subject: '',
    from: '',
    to: '',
    score: ''
  }]),
  oldEducationInfo: List([]),
  experienceInfo: List([{
    id: null,
    company: '',
    role: '',
    roleDescription: ''
  }]),
  oldExperienceInfo: List([])
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case STORE_PROFILE_DETAILS:
      return state.withMutations((mutableState) => {
        const MapResume = fromJS(action.data.resume);
        mutableState
          .set('firstName', action.data.firstName)
          .set('lastName', action.data.lastName)
          .set('email', action.data.email)
          .set('phoneNumber', action.data.phoneNumber)
          .set('dob', action.data.dob)
          .set('gender', action.data.gender)
          .set('ethnicity', action.data.ethnicity)
          .set('nationality', action.data.nationality)
          .set('resume', MapResume)
      });

    case STORE_SKILL_INTERESTS:
      return state.withMutations((mutableState) => {
        const intrestedIndustries = fromJS(action.data.intrestedIndustries);
        const intrestedCompanies = fromJS(action.data.intrestedCompanies);
        const skills = fromJS(action.data.skills);
        const oldSkills = fromJS(action.data.oldSkills);
        mutableState
          .set('intrestedIndustries', intrestedIndustries)
          .set('intrestedCompanies', intrestedCompanies)
          .set('skills', skills)
          .set('oldSkills', oldSkills)
      });

    case STORE_EDUCATION:
      return state.withMutations((mutableState) => {
        const educationInfo = fromJS(action.data.educationInfo)
        const oldEducationInfo = fromJS(action.data.oldEducationInfo)
        mutableState
          .set('educationInfo', educationInfo)
          .set('oldEducationInfo', oldEducationInfo)
      });

    case STORE_EXPERIENCE:
      return state.withMutations((mutableState) => {
        const experienceInfo = fromJS(action.data.experienceInfo)
        const oldExperienceInfo = fromJS(action.data.oldExperienceInfo)
        mutableState
          .set('experienceInfo', experienceInfo)
          .set('oldExperienceInfo', oldExperienceInfo)
      });

    case WARN_MSG_INIT:
      return state.withMutations((mutableState) => {
        mutableState
          .set('warnMsg', action.data.warnMsg)
      });

    case WARN_MSG_REMOVE:
      return state.withMutations((mutableState) => {
        mutableState
          .set('warnMsg', '')
      });

    default:
      return state;
  }
}
