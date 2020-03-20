import { fromJS, List } from 'immutable';
import {
  STORE_STEP2_INFO,
  STORE_STEP3_INFO,
  STORE_STEP4_INFO,
  STORE_STEP5_INFO,
  STORE_STEP6_INFO,
  CAMPAIGN_INFO_INIT,
  CAMPAIGN_INIT_MSG,
  CAMPAIGN_REMOVE_MSG,
  REMOVE_CAMPAIGN_INFO
} from 'dan-actions/actionConstants';
import { DateHelper } from '../helpers/dateTimeHelper';

const initialState = {
  warnMsg: '',
  campaignStatus: -3,
  role: -1,
  roleData: List([]),
  university: List([]),
  subjects: List([]),
  skills: List([]),
  keywords: List([]),
  gender: List([]),
  interestedSectors: List([]),
  workLocation: List([]),
  selectedYear: List([]),
  ethnicity: 'Prefer not to say',
  experience: 'no',
  minGrade: List([]),
  heading: '',
  body: '',
  deadline: DateHelper.format(DateHelper.addDays(new Date(), 5)),
  choosedDeadline: '0',
  name: '',
  action: 'create'
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case STORE_STEP2_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('role', action.data.role)
      });

    case STORE_STEP3_INFO:
      return state.withMutations((mutableState) => {
        const university = fromJS(action.data.university);
        const keywords = fromJS(action.data.keywords);
        const subjects = fromJS(action.data.subjects);
        const skills = fromJS(action.data.skills);
        const gender = fromJS(action.data.gender);
        const interestedSectors = fromJS(action.data.interestedSectors);
        const workLocation = fromJS(action.data.workLocation);
        const minGrade = fromJS(action.data.minGrade);
        const selectedYear = fromJS(action.data.selectedYear);
        mutableState
          .set('university', university)
          .set('subjects', subjects)
          .set('skills', skills)
          .set('keywords', keywords)
          .set('gender', gender)
          .set('selectedYear', action.data.selectedYear)
          .set('ethnicity', action.data.ethnicity)
          .set('interestedSectors', interestedSectors)
          .set('workLocation', workLocation)
          .set('experience', action.data.experience)
          .set('minGrade', action.data.minGrade);
      });

    case STORE_STEP4_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('heading', action.data.heading)
          .set('body', action.data.body);
      });

    case STORE_STEP5_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('deadline', action.data.deadline)
          .set('choosedDeadline', action.data.choosedDeadline);
      });

    case STORE_STEP6_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('name', action.data);
      });

    case CAMPAIGN_INIT_MSG:
      return state.withMutations((mutableState) => {
        mutableState
          .set('warnMsg', action.data.warnMsg);
      });

    case CAMPAIGN_REMOVE_MSG:
      return state.withMutations((mutableState) => {
        mutableState
          .set('warnMsg', '');
      });

    case CAMPAIGN_INFO_INIT:
      return state.withMutations((mutableState) => {
        const university = fromJS(action.data.university);
        const keywords = fromJS(action.data.keywords);
        const subjects = fromJS(action.data.subjects);
        const skills = fromJS(action.data.skills);
        const gender = fromJS(action.data.gender);
        const interestedSectors = fromJS(action.data.interestedSectors);
        const workLocation = fromJS(action.data.workLocation);
        const roleData = fromJS(action.data.roleData);
        const minGrade = fromJS(action.data.minGrade);
        const selectedYear = fromJS(action.data.selectedYear);

        mutableState
          .set('campaignStatus', action.data.campaignStatus)
          .set('roleData', roleData)
          .set('role', action.data.role)
          .set('university', university)
          .set('subjects', subjects)
          .set('skills', skills)
          .set('keywords', keywords)
          .set('gender', gender)
          .set('selectedYear', action.data.selectedYear)
          .set('ethnicity', action.data.ethnicity)
          .set('interestedSectors', interestedSectors)
          .set('workLocation', workLocation)
          .set('experience', action.data.experience)
          .set('minGrade', action.data.minGrade)
          .set('heading', action.data.heading)
          .set('body', action.data.body)
          .set('deadline', action.data.deadline)
          .set('choosedDeadline', action.data.choosedDeadline)
          .set('name', action.data.name);
      });

    case REMOVE_CAMPAIGN_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('roleData', List([]))
          .set('campaignStatus', -3)
          .set('role', -1)
          .set('university', List([]))
          .set('subjects', List([]))
          .set('skills', List([]))
          .set('keywords', List([]))
          .set('gender', List([]))
          .set('selectedYear', List([]))
          .set('ethnicity', 'No-preference')
          .set('interestedSectors', List([]))
          .set('workLocation', List([]))
          .set('experience', 'no')
          .set('minGrade', ([]))
          .set('heading', '')
          .set('body', '')
          .set('deadline', DateHelper.format(DateHelper.addDays(new Date(), 5)))
          .set('choosedDeadline', '0')
          .set('name', '');
      });

    default:
      return state;
  }
}
