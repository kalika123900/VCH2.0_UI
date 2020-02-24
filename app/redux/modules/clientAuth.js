import { fromJS } from 'immutable';
import {
  CLIENT_LOGGED_IN,
  CLIENT_LOGGED_OUT
} from 'dan-actions/actionConstants';

const initialState = {
  isLoggedIn: false
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case CLIENT_LOGGED_IN:
      return state.withMutations((mutableState) => {
        mutableState
          .set('isLoggedIn', true)
      });
    case CLIENT_LOGGED_OUT:
      return state.withMutations((mutableState) => {
        mutableState
          .set('isLoggedIn', false)
      });
    default:
      return state;
  }
}