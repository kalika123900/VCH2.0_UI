import { fromJS, List } from 'immutable';
import {
  STORE_PROFILE_DETAILS,
  STORE_SKILL_INTERESTS,
  STORE_EDUCATION,
  STORE_EXPERIENCE,
  STUDENT_PROFILE_INIT
} from 'dan-actions/actionConstants';
import { DateHelper } from '../helpers/dateTimeHelper';

const initialState = {
  firstName: '',
  lastName: '',
  alternateEmail: '',
  phoneNumber: '',
  dob: DateHelper.format(DateHelper.addDays(new Date(), -6580)),
  gender: List([]),
  ethnicity: List([]),
  nationality: List([]),
  keywords: List([]),
  intrestedIndustries: List([]),
  intrestedCompanies: List([]),
  skills: List([]),
  files: List([]),
  education: List([]),
  experience: List([]),
  action: 'create'
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case STORE_PROFILE_DETAILS:
      return state.withMutations((mutableState) => {
        const firstName = fromJS(action.data.firstName);
        const lastName = fromJS(action.data.lastName);
        const alternateEmail = fromJS(action.data.alternateEmail);
        const phoneNumber = fromJS(action.data.phoneNumber);
        const dob = fromJS(action.data.dob);
        const gender = fromJS(action.data.gender);
        const ethnicity = fromJS(action.data.ethnicity);
        const nationality = fromJS(action.data.nationality);
        const files = fromJS(action.data.files);
        mutableState
          .set('firstName', firstName)
          .set('lastName', lastName)
          .set('alternateEmail', alternateEmail)
          .set('phoneNumber', phoneNumber)
          .set('dob', dob)
          .set('gender', gender)
          .set('ethnicity', ethnicity)
          .set('nationality', nationality)
          .set('files', files)

      });
    case STORE_SKILL_INTERESTS:
      return state.withMutations((mutableState) => {
        const intrestedIndustries = fromJS(action.data.intrestedIndustries);
        const intrestedCompanies = fromJS(action.data.intrestedCompanies);
        const skills = fromJS(action.data.skills);
        mutableState
          .set('intrestedIndustries', intrestedIndustries)
          .set('intrestedCompanies', intrestedCompanies)
          .set('skills', skills)
      });
    case STORE_EDUCATION:
      return state.withMutations((mutableState) => {
        const education = fromJS(action.data.education);
        mutableState
          .set('education', education)
      });
    case STORE_EXPERIENCE:
      return state.withMutations((mutableState) => {
        const experience = fromJS(action.data.education);
        mutableState
          .set('experience', experience)
      });
    case STUDENT_PROFILE_INIT:
      return state.withMutations((mutableState) => {
        const firstName = fromJS(action.data.firstName);
        const lastName = fromJS(action.data.lastName);
        const alternateEmail = fromJS(action.data.alternateEmail);
        const phoneNumber = fromJS(action.data.phoneNumber);
        const dob = fromJS(action.data.dob);
        const gender = fromJS(action.data.gender);
        const ethnicity = fromJS(action.data.ethnicity);
        const nationality = fromJS(action.data.nationality);
        const intrestedIndustries = fromJS(action.data.intrestedIndustries);
        const intrestedCompanies = fromJS(action.data.intrestedCompanies);
        const skills = fromJS(action.data.skills);
        const experience = fromJS(action.data.education);
        const education = fromJS(action.data.education);
        const files = fromJS(action.data.files)
        mutableState
          .set('firstName', firstName)
          .set('lastName', lastName)
          .set('alternateEmail', alternateEmail)
          .set('phoneNumber', phoneNumber)
          .set('skills', skills)
          .set('dob', dob)
          .set('gender', gender)
          .set('ethnicity', ethnicity)
          .set('nationality', nationality)
          .set('intrestedIndustries', intrestedIndustries)
          .set('intrestedCompanies', intrestedCompanies)
          .set('skills', skills)
          .set('education', education)
          .set('experience', experience)
          .set('file', files)
      });

    default:
      return state;
  }
}
