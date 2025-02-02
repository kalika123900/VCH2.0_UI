import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import dummyData from 'dan-api/dummy/dummyContents';
import {
  FETCH_EMAIL_DATA,
  OPEN_MAIL,
  FILTER_MAIL,
  COMPOSE_MAIL,
  SEND_MAIL,
  DISCARD_MESSAGE,
  SEARCH_MAIL,
  DELETE_MAIL,
  MOVE_TO,
  TOGGLE_STARED,
  CLOSE_NOTIF,
  SET_RECENT_CAMPAIGN
} from '../../actions/actionConstants';
import { getDate, getTime } from '../helpers/dateTimeHelper';

const initialState = {
  inbox: List([]),
  selectedMail: 0,
  selectedMailId: '',
  keywordValue: '',
  currentPage: 'inbox',
  openFrm: false,
  notifMsg: '',
  recentCampaignId: -1
};

const buildMessage = (to, subject, content, files) => {
  const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  const newData = Map({
    id,
    date: getDate(),
    time: getTime(),
    avatar: dummyData.user.avatar,
    name: to,
    subject,
    content,
    attachment: files,
    category: 'sent',
    stared: false,
  });
  return newData;
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case SET_RECENT_CAMPAIGN:
      return state.withMutations((mutableState) => {
        mutableState.set('recentCampaignId', action.data.id);
      });
    case FETCH_EMAIL_DATA:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('inbox', items);
      });
    case OPEN_MAIL:
      return state.withMutations((mutableState) => {
        const index = state.get('inbox').indexOf(action.mail);
        mutableState.set('selectedMail', index);
      });
    case FILTER_MAIL:
      return state.withMutations((mutableState) => {
        mutableState.set('currentPage', action.filter);
      });
    case COMPOSE_MAIL:
      return state.withMutations((mutableState) => {
        mutableState.set('openFrm', true);
      });
    case SEND_MAIL:
      return state.withMutations((mutableState) => {
        mutableState
          .set('openFrm', false)
          .set('notifMsg', notif.sent);
      });
    case DISCARD_MESSAGE:
      return state.withMutations((mutableState) => {
        mutableState
          .set('openFrm', false)
          .set('selectedMailId', '')
          .set('notifMsg', notif.discard);
      });
    case SEARCH_MAIL:
      return state.withMutations((mutableState) => {
        action.keyword.persist();
        const keyword = action.keyword.target.value.toLowerCase();
        mutableState.set('keywordValue', keyword);
      });
    case DELETE_MAIL:
      return state.withMutations((mutableState) => {
        const index = state.get('inbox').indexOf(action.mail);
        mutableState
          .update('inbox', inbox => inbox.splice(index, 1))
          .set('notifMsg', notif.removed);
      });
    case TOGGLE_STARED:
      return state.withMutations((mutableState) => {
        const index = state.get('inbox').indexOf(action.mail);
        mutableState.update('inbox', inbox => inbox
          .setIn([index, 'stared'], !state.getIn(['inbox', index, 'stared']))
        );
      });
    case MOVE_TO:
      return state.withMutations((mutableState) => {
        const index = state.get('inbox').indexOf(action.mail);
        mutableState
          .update('inbox', inbox => inbox
            .setIn([index, 'category'], action.category)
          )
          .set('notifMsg', notif.labeled);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', '');
      });
    default:
      return state;
  }
}
