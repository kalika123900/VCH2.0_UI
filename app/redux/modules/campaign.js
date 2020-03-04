import { fromJS, List } from 'immutable';
import {
  STORE_STEP2_INFO,
  STORE_STEP3_INFO,
  STORE_STEP4_INFO,
  STORE_STEP5_INFO,
  STORE_STEP6_INFO,
  REMOVE_CAMPAIGN_INFO
} from 'dan-actions/actionConstants';
import { DateHelper } from '../helpers/dateTimeHelper';

const initialState = {
  role: 1,
  university: List([]),
  subjects: List([]),
  skills: List([]),
  keywords: List([]),
  gender: List([]),
  interestedSectors: List([]),
  workLocation: List([]),
  selectedYear: '',
  ethnicity: 'Prefer not to say',
  experience: 'no',
  minGrade: 1,
  heading: '',
  body: '',
  deadline: DateHelper.format(DateHelper.addDays(new Date(), 5)),
  choosedDeadline: '0',
  name: ''
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case STORE_STEP2_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('role', action.data);
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

    case REMOVE_CAMPAIGN_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('role', 1)
          .set('university', List([]))
          .set('subjects', List([]))
          .set('skills', List([]))
          .set('keywords', List([]))
          .set('gender', List([]))
          .set('selectedYear', '')
          .set('ethnicity', 'No-preference')
          .set('interestedSectors', List([]))
          .set('workLocation', List([]))
          .set('experience', 'no')
          .set('minGrade', 0)
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
