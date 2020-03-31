import { fromJS, List } from 'immutable';
import {
  EMAIL_STEP1_INFO,
  EMAIL_STEP2_INFO,
  EMAIL_STEP3_INFO,
  EMAIL_STEP4_INFO,
  EMAIL_STEP5_INFO,
  EMAIL_STEP6_INFO,
  EMAIL_INFO_INIT,
  EMAIL_INFO_REMOVE,
  EMAIL_INIT_MSG,
  EMAIL_REMOVE_MSG,
} from 'dan-actions/actionConstants';
import { DateHelper } from '../helpers/dateTimeHelper';

const initialState = {
  studentList: List([]),
  blackList: List([]),
  warnMsg: '',
  role: -1,
  roleDeadline: '',
  roleName: '',
  roleData: List([]),
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
  deadline: DateHelper.format(DateHelper.addDays(new Date(), 5)),
  choosedDeadline: '5',
  name: ''
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case EMAIL_STEP1_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('role', action.data.role)
          .set('roleName', action.data.roleName)
          .set('roleDeadline', action.data.roleDeadline)
      });

    case EMAIL_STEP2_INFO:
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
          .set('selectedYear', selectedYear)
          .set('ethnicity', action.data.ethnicity)
          .set('interestedSectors', interestedSectors)
          .set('workLocation', workLocation)
          .set('experience', action.data.experience)
          .set('minGrade', minGrade);
      });

    case EMAIL_STEP3_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('heading', action.data.heading)
          .set('body', action.data.body);
      });

    case EMAIL_STEP4_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('deadline', action.data.deadline)
          .set('choosedDeadline', action.data.choosedDeadline);
      });

    case EMAIL_STEP5_INFO:
      return state.withMutations((mutableState) => {
        const blackList = fromJS(action.data.blackList);
        const studentList = fromJS(action.data.studentList);
        mutableState
          .set('blackList', blackList)
          .set('studentList', studentList)
      });

    case EMAIL_STEP6_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('name', action.data)
      });

    case EMAIL_INIT_MSG:
      return state.withMutations((mutableState) => {
        mutableState
          .set('warnMsg', action.data.warnMsg);
      });

    case EMAIL_REMOVE_MSG:
      return state.withMutations((mutableState) => {
        mutableState
          .set('warnMsg', '');
      });

    case EMAIL_INFO_INIT:
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
        const blackList = fromJS(action.data.blackList);
        const studentList = fromJS(action.data.studentList);

        mutableState
          .set('roleName', action.data.roleName)
          .set('roleDeadline', action.data.roleDeadline)
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
          .set('blackList', blackList)
          .set('studentList', studentList)
      });

    case EMAIL_INFO_REMOVE:
      return state.withMutations((mutableState) => {
        mutableState
          .set('roleName', '')
          .set('roleDeadline', '')
          .set('roleData', List([]))
          .set('role', -1)
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
          .set('deadline', DateHelper.format(DateHelper.addDays(new Date(), 5)))
          .set('choosedDeadline', '0')
          .set('name', '')
          .set('blackList', List([]))
          .set('studentList', List([]))
      });

    default:
      return state;
  }
}
