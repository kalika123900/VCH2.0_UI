import { fromJS } from 'immutable';
import {
  SET_AUTH,
  REMOVE_AUTH
} from 'dan-actions/actionConstants';
const initialState = {
  userType: false,
  userDetail: {}
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case SET_AUTH:
      return state.withMutations((mutableState) => {
        mutableState
          .set('userType', action.data.userType)
          .set('userDetails', action.data.userDetail);
      });
    case REMOVE_AUTH:
      return state.withMutations((mutableState) => {
        mutableState
          .set('userType', false)
          .set('userDetails', {});
      });
    default:
      return state;
  }
}
