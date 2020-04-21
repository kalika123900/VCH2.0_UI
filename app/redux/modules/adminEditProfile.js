import { fromJS } from 'immutable';
import {
  ADMIN_PROFILE_DETAILS,
  ADMIN_PROFILE_INIT,
} from 'dan-actions/actionConstants';

const initialState = {
  firstName: '',
  lastName: '',
  userEmail: '',
  phone: '',
  username: '',
}
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case ADMIN_PROFILE_DETAILS:
      return state.withMutations((mutableState) => {
        mutableState
          .set('firstName', action.data.firstName)
          .set('lastName', action.data.lastName)
          .set('userEmail', action.data.userEmail)
          .set('phone', action.data.phone)
          .set('username', action.data.username)
      });
    case ADMIN_PROFILE_INIT:
      return state.withMutations((mutableState) => {
        mutableState
          .set('firstName', action.data.firstName)
          .set('lastName', action.data.lastName)
          .set('userEmail', action.data.userEmail)
          .set('phone', action.data.phone)
          .set('username', action.data.username)

      });
    default:
      return state;
  }
}
