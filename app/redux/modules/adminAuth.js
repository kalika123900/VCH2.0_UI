import { fromJS } from 'immutable';
import {
  ADMIN_LOGGED_IN,
  ADMIN_LOGGED_OUT
} from 'dan-actions/actionConstants';

const initialState = {
  isLoggedIn: false
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case ADMIN_LOGGED_IN:
      return state.withMutations((mutableState) => {
        mutableState
          .set('isLoggedIn', true)
      });
    case ADMIN_LOGGED_OUT:
      return state.withMutations((mutableState) => {
        mutableState
          .set('isLoggedIn', false)
      });
    default:
      return state;
  }
}