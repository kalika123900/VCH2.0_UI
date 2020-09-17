import { fromJS } from 'immutable';
import {
  SET_NOTIF
} from 'dan-actions/actionConstants';

const initialState = {
  message: '',
  variant: '',
  vertical: 'top',
  horizontal: 'right'
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case SET_NOTIF:
      return state.withMutations((mutableState) => {
        for (const [key, value] of Object.entries(action.payload))
          mutableState
            .set(key, value)
      });
    default:
      return state;
  }
}
