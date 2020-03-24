import { fromJS, List } from 'immutable';
import {
  STORE_PROFILE_DETAILS,
  STORE_SKILL_INTERESTS,
  STORE_EDUCATION_DATA,
  STORE_EXPERIENCE,
  STUDENT_PROFILE_INIT,
  STORE_SKILL_INTERESTS_INIT,
  STORE_EDUCATION_DATA_INIT,
  STORE_EXPERIENCE_INIT,
} from 'dan-actions/actionConstants';
import { DateHelper } from '../helpers/dateTimeHelper';

const initialState = {
  firstName: '',
  lastName: '',
  alternateEmail: '',
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
  files: List([]),
  company: '',
  role: '',
  roleDescription: '',
  educationInfo: List([{
    id: 0,
    institute: '',
    qualification: '',
    education_from: '',
    education_to: '',
    course: '',
    grade: '',
    type: 'university',
  }]),

  oldEducationInfo: List([{
    id: 0,
    institute: '',
    qualification: '',
    education_to: '',
    eduTo: '',
    course: '',
    grade: '',
    type: 'university',
  }]),
  experienceInfo: List([{
    id: 0,
    company: '',
    role: '',
    roleDescription: ''
  }]),
  oldExperienceInfo: List([{
    id: 0,
    company: '',
    role: '',
    roleDescription: ''
  }]),
  action: 'create'
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case STORE_PROFILE_DETAILS:
      return state.withMutations((mutableState) => {
        const files = fromJS(action.data.files);
        mutableState
          .set('firstName', action.data.firstName)
          .set('lastName', action.data.lastName)
          .set('alternateEmail', action.data.alternateEmail)
          .set('phoneNumber', action.data.phoneNumber)
          .set('dob', action.data.dob)
          .set('gender', action.data.gender)
          .set('ethnicity', action.data.ethnicity)
          .set('nationality', action.data.nationality)
          .set('files', files)

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
    case STORE_EDUCATION_DATA:
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
    case STUDENT_PROFILE_INIT:
      return state.withMutations((mutableState) => {
        const files = fromJS(action.data.files);
        mutableState
          .set('firstName', action.data.firstName)
          .set('lastName', action.data.lastName)
          .set('alternateEmail', action.data.alternateEmail)
          .set('phoneNumber', action.data.phoneNumber)
          .set('dob', action.data.dob)
          .set('gender', action.data.gender)
          .set('ethnicity', action.data.ethnicity)
          .set('nationality', action.data.nationality)
          .set('file', files)
      });
    case STORE_SKILL_INTERESTS_INIT:
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
    case STORE_EDUCATION_DATA_INIT:
      return state.withMutations((mutableState) => {
        const educationInfo = fromJS(action.data.educationInfo)
        const oldEducationInfo = fromJS(action.data.oldEducationInfo)

        mutableState
          .set('educationInfo', educationInfo)
          .set('oldEducationInfo', oldEducationInfo)
      });
    case STORE_EXPERIENCE_INIT:
      return state.withMutations((mutableState) => {
        const experienceInfo = fromJS(action.data.experienceInfo)
        const oldExperienceInfo = fromJS(action.data.oldExperienceInfo)
        mutableState
          .set('experienceInfo', experienceInfo)
          .set('oldExperienceInfo', oldExperienceInfo)

      });

    default:
      return state;
  }
}
