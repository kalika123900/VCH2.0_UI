import { fromJS, List } from 'immutable';
import {
  STORE_STEP1_INFO,
  STORE_STEP2_INFO,
  STORE_STEP3_INFO,
  STORE_STEP4_INFO,
  STORE_STEP5_INFO,
  STORE_STEP6_INFO,
  REMOVE_CAMPAIGN_INFO
} from 'dan-actions/actionConstants';

const DateHelper = {
  addDays(aDate, numberOfDays) {
    aDate.setDate(aDate.getDate() + numberOfDays);
    return aDate;
  },
  format: function format(date) {
    return [
      ('0' + date.getDate()).slice(-2),
      ('0' + (date.getMonth() + 1)).slice(-2),
      date.getFullYear()
    ].join('/');
  }
};

const initialState = {
  goal: { id: 1, value: 'Get more people to an event' },
  role: 1,
  language: '',
  gender: List([]),
  university: List([]),
  keywords: List([]),
  heading: '',
  body: '',
  budget: 20,
  deadline: DateHelper.format(DateHelper.addDays(new Date(), 5)),
  name: ''
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case STORE_STEP1_INFO:
      return state.withMutations((mutableState) => {
        const goal = fromJS(action.data);
        mutableState
          .set('goal', goal);
      });
    case STORE_STEP2_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('role', action.data);
      });
    case STORE_STEP3_INFO:
      return state.withMutations((mutableState) => {
        const gender = fromJS(action.data.gender);
        const university = fromJS(action.data.university);
        const keywords = fromJS(action.data.keywords);
        mutableState
          .set('language', action.data.language)
          .set('gender', gender)
          .set('university', university)
          .set('keywords', keywords);
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
          .set('budget', action.data.budget)
          .set('deadline', action.data.deadline);
      });
    case STORE_STEP6_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('name', action.data);
      });

    case REMOVE_CAMPAIGN_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('goal', fromJS({ id: 1, value: 'Get more people to an event' }))
          .set('role', 1)
          .set('language', '')
          .set('gender', List([]))
          .set('university', List([]))
          .set('keywords', List([]))
          .set('heading', '')
          .set('body', '')
          .set('budget', 20)
          .set('deadline', '')
          .set('name', '');
      });
    default:
      return state;
  }
}
