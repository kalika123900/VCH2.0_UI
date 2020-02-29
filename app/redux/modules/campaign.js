import { fromJS, List } from 'immutable';
import {
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
  role: 1,
  language: '',
  gender: -1,
  university: List([]),
  keywords: List([]),
  heading: '',
  body: '',
  deadline: DateHelper.format(DateHelper.addDays(new Date(), 5)),
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
        mutableState
          .set('gender', action.data.gender)
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
          .set('role', 1)
          .set('gender', -1)
          .set('university', List([]))
          .set('keywords', List([]))
          .set('heading', '')
          .set('body', '')
          .set('deadline', '')
          .set('name', '');
      });
    default:
      return state;
  }
}
