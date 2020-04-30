import { fromJS, List } from 'immutable';
import {
  STORE_ROLE_INFO,
  REMOVE_ROLE_INFO
} from 'dan-actions/actionConstants';
import { DateHelper } from '../helpers/dateTimeHelper';

const initialState = {
  roleName: '',
  courses: List([]),
  skills: List([]),
  roleDescriptors: List([]),
  roleDeadline: DateHelper.format(DateHelper.addDays(new Date(), 28)),
  roleLink: '',
  roleDesc: '',
  experienceLevel: '',
  roleType: ''
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case STORE_ROLE_INFO:
      return state.withMutations((mutableState) => {
        const courses = fromJS(action.data.courses);
        const skills = fromJS(action.data.skills);
        const roleDescriptors = fromJS(action.data.roleDescriptors);
        mutableState
          .set('roleName', action.data.roleName)
          .set('courses', courses)
          .set('skills', skills)
          .set('roleDeadline', action.data.roleDeadline)
          .set('roleDescriptors', roleDescriptors)
          .set('roleLink', action.data.roleLink)
          .set('roleDesc', action.data.roleDesc)
          .set('experienceLevel', action.data.experienceLevel)
          .set('roleType', action.data.roleType)
      });
    case REMOVE_ROLE_INFO:
      return state.withMutations((mutableState) => {
        mutableState
          .set('roleName', '')
          .set('courses', List([]))
          .set('skills', List([]))
          .set('roleDeadline', DateHelper.format(DateHelper.addDays(new Date(), 28)))
          .set('roleDescriptors', List([]))
          .set('roleLink', '')
          .set('roleDesc', '')
          .set('experienceLevel', '')
          .set('roleType', '')
      });
    default:
      return state;
  }
}
