import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import {
  ADD_ROLE,
  FETCH_ROLE_DATA,
  CLOSE_ROLE_FORM,
  EDIT_ROLE,
  SHOW_DETAIL_ROLE,
  HIDE_DETAIL_ROLE,
  SUBMIT_ROLE,
  DELETE_ROLE,
  CLOSE_NOTIF_ROLE
} from '../../actions/actionConstants';

const initialState = {
  roleList: List([]),
  formValues: Map(),
  selectedIndex: 0,
  selectedId: '',
  openFrm: false,
  notifMsg: '',
  showRoleDetail: false
};

let editingIndex = 0;

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case ADD_ROLE:
      return state.withMutations((mutableState) => {
        mutableState
          .set('openFrm', true)
          .set('formValues', Map([]));
      });
    case FETCH_ROLE_DATA:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('roleList', items);
      });
    case CLOSE_ROLE_FORM:
      return state.withMutations((mutableState) => {
        mutableState
          .set('openFrm', false)
          .set('formValues', null)
          .set('notifMsg', notif.discard);
      });
    case EDIT_ROLE:
      return state.withMutations((mutableState) => {
        editingIndex = state.get('roleList').indexOf(action.item);
        mutableState
          .set('openFrm', true)
          .set('selectedId', action.item.get('id'))
          .set('formValues', action.item);
      });
    case SUBMIT_ROLE:
      return state.withMutations((mutableState) => {
        const initItem = Map(action.newData);
        if (state.get('selectedId') === action.newData.get('id')) {
          // Update data
          mutableState
            .update('roleList', roleList => roleList.setIn(
              newItem, [editingIndex]
            ))
            .set('notifMsg', notif.updated);
        } else {
          // Insert data
          const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
          const newItem = initItem
            .update('id', (val = id) => val);
          mutableState
            .update('roleList', roleList => roleList.unshift(newItem))
            .set('selectedIndex', 0)
            .set('notifMsg', notif.saved);
        }
        mutableState
          .set('formValues', null)
          .set('openFrm', false);
      });
    case SHOW_DETAIL_ROLE:
      return state.withMutations((mutableState) => {
        const index = state.get('roleList').indexOf(action.item);
        mutableState
          .set('selectedIndex', index)
          .set('showRoleDetail', true);
      });
    case HIDE_DETAIL_ROLE:
      return state.withMutations((mutableState) => {
        mutableState.set('showRoleDetail', false);
      });
    case DELETE_ROLE:
      return state.withMutations((mutableState) => {
        const index = state.get('roleList').indexOf(action.item);
        mutableState
          .update('roleList', roleList => roleList.splice(index, 1))
          .set('notifMsg', notif.removed);
      });
    case CLOSE_NOTIF_ROLE:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', '');
      });
    default:
      return state;
  }
}
