import { fromJS } from 'immutable';
import {
  STUDENT_LOGGED_IN,
  STUDENT_LOGGED_OUT
} from 'dan-actions/actionConstants';

const initialState = {
  isLoggedIn: false
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case STUDENT_LOGGED_IN:
      return state.withMutations((mutableState) => {
        mutableState
          .set('isLoggedIn', true)
      });
    case STUDENT_LOGGED_OUT:
      return state.withMutations((mutableState) => {
        mutableState
          .set('isLoggedIn', false)
      });
    default:
      return state;
  }
}
