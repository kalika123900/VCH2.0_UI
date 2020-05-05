import { fromJS, List } from 'immutable';
import {
  STORE_STEP2_INFO,
  STORE_STEP3_INFO,
  STORE_STEP4_INFO,
  STORE_STEP5_INFO,
  STORE_STEP6_INFO,
  STORE_FOLLOW_UPS,
  CAMPAIGN_INFO_INIT,
  CAMPAIGN_INIT_MSG,
  CAMPAIGN_REMOVE_MSG,
  REMOVE_CAMPAIGN_INFO,
  RESTORE_CAMPAIGN_PROGRESS
} from 'dan-actions/actionConstants';
import { DateHelper } from '../helpers/dateTimeHelper';

const initialState = {
  followUps: List([]),
  warnMsg: '',
  campaignStatus: -3,
  role: -1,
  roleDeadline: '',
  roleName: '',
  roleData: List([]),
  languages: List([]),
  qualificationType: List([]),
  university: List([]),
  subjects: List([]),
  skills: List([]),
  keywords: List([]),
  gender: List(['Prefer not to say']),
  interestedSectors: List([]),
  workLocation: List(['London']),
  selectedYear: List([]),
  ethnicity: 'Not Preferable',
  experience: 'no',
  minGrade: List([]),
  heading: '',
  body: '',
  deadline: DateHelper.format(DateHelper.addDays(new Date(), 7)),
  choosedDeadline: '28',
  name: '',
  audience: 10,
  societies: List([]),
  activeStep: 0
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case STORE_STEP2_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('role', action.data.role)
          .set('roleName', action.data.roleName)
          .set('roleDeadline', action.data.roleDeadline)
      });

    case STORE_STEP3_INFO:
      return state.withMutations((mutableState) => {
        const university = fromJS(action.data.university);
        const languages = fromJS(action.data.languages);
        const qualificationType = fromJS(action.data.qualificationType);
        const keywords = fromJS(action.data.keywords);
        const subjects = fromJS(action.data.subjects);
        const skills = fromJS(action.data.skills);
        const gender = fromJS(action.data.gender);
        const interestedSectors = fromJS(action.data.interestedSectors);
        const workLocation = fromJS(action.data.workLocation);
        const minGrade = fromJS(action.data.minGrade);
        const selectedYear = fromJS(action.data.selectedYear);
        const societies = fromJS(action.data.societies)
        mutableState
          .set('qualificationType', qualificationType)
          .set('languages', languages)
          .set('university', university)
          .set('subjects', subjects)
          .set('skills', skills)
          .set('keywords', keywords)
          .set('gender', gender)
          .set('selectedYear', selectedYear)
          .set('ethnicity', action.data.ethnicity)
          .set('interestedSectors', interestedSectors)
          .set('workLocation', workLocation)
          .set('experience', action.data.experience)
          .set('minGrade', minGrade)
          .set('societies', societies)
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
          .set('name', action.data.name)
          .set('audience', action.data.audience)
      });

    case CAMPAIGN_INIT_MSG:
      return state.withMutations((mutableState) => {
        mutableState
          .set('warnMsg', action.data.warnMsg);
      });

    case STORE_FOLLOW_UPS:
      return state.withMutations((mutableState) => {
        mutableState
          .set('followUps', action.data.followUps);
      });

    case CAMPAIGN_REMOVE_MSG:
      return state.withMutations((mutableState) => {
        mutableState
          .set('warnMsg', '');
      });

    case CAMPAIGN_INFO_INIT:
      return state.withMutations((mutableState) => {
        const languages = fromJS(action.data.languages);
        const qualificationType = fromJS(action.data.qualificationType);
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
        const societies = fromJS(action.data.societies);

        mutableState
          .set('audience', action.data.audience)
          .set('qualificationType', qualificationType)
          .set('languages', languages)
          .set('campaignStatus', action.data.campaignStatus)
          .set('roleDeadline', action.data.roleDeadline)
          .set('roleName', action.data.roleName)
          .set('roleData', roleData)
          .set('role', action.data.role)
          .set('university', university)
          .set('subjects', subjects)
          .set('skills', skills)
          .set('keywords', keywords)
          .set('gender', gender)
          .set('selectedYear', selectedYear)
          .set('ethnicity', action.data.ethnicity)
          .set('interestedSectors', interestedSectors)
          .set('workLocation', workLocation)
          .set('experience', action.data.experience)
          .set('minGrade', minGrade)
          .set('heading', action.data.heading)
          .set('body', action.data.body)
          .set('deadline', action.data.deadline)
          .set('choosedDeadline', action.data.choosedDeadline)
          .set('name', action.data.name)
          .set('societies', societies)
      });

    case REMOVE_CAMPAIGN_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('roleName', '')
          .set('roleDeadline', '')
          .set('followUps', List([]))
          .set('roleData', List([]))
          .set('campaignStatus', -3)
          .set('role', -1)
          .set('qualificationType', List([]))
          .set('languages', List([]))
          .set('university', List([]))
          .set('subjects', List([]))
          .set('skills', List([]))
          .set('keywords', List([]))
          .set('gender', List([]))
          .set('selectedYear', List([]))
          .set('ethnicity', 'No-preference')
          .set('interestedSectors', List([]))
          .set('workLocation', List(['London']))
          .set('experience', 'no')
          .set('minGrade', List([]))
          .set('heading', '')
          .set('body', '')
          .set('deadline', DateHelper.format(DateHelper.addDays(new Date(), 7)))
          .set('choosedDeadline', '28')
          .set('name', '')
          .set('audience', 10)
          .set('societies', List([]))
      });

    case RESTORE_CAMPAIGN_PROGRESS:
      const university = fromJS(action.data.university);
      const languages = fromJS(action.data.languages);
      const qualificationType = fromJS(action.data.qualificationType);
      const keywords = fromJS(action.data.keywords);
      const subjects = fromJS(action.data.subjects);
      const skills = fromJS(action.data.skills);
      const gender = fromJS(action.data.gender);
      const interestedSectors = fromJS(action.data.interestedSectors);
      const workLocation = fromJS(action.data.workLocation);
      const minGrade = fromJS(action.data.minGrade);
      const selectedYear = fromJS(action.data.selectedYear);
      const societies = fromJS(action.data.societies)
      return state.withMutations((mutableState) => {
        mutableState
          .set('role', action.data.role)
          .set('roleName', action.data.roleName)
          .set('roleDeadline', action.data.roleDeadline)
          .set('qualificationType', qualificationType)
          .set('languages', languages)
          .set('university', university)
          .set('subjects', subjects)
          .set('skills', skills)
          .set('keywords', keywords)
          .set('gender', gender)
          .set('selectedYear', selectedYear)
          .set('ethnicity', action.data.ethnicity)
          .set('interestedSectors', interestedSectors)
          .set('workLocation', workLocation)
          .set('experience', action.data.experience)
          .set('minGrade', minGrade)
          .set('societies', societies)
          .set('heading', action.data.heading)
          .set('body', action.data.body)
          .set('deadline', action.data.deadline)
          .set('choosedDeadline', action.data.choosedDeadline)
          .set('name', action.data.name)
          .set('audience', action.data.audience)
          .set('activeStep', action.data.activeStep)
      });

    default:
      return state;
  }
}
