import {
  FETCH_USER_GROUPS_SUCCESS
} from '../actions/actionTypes/User';
import {
  CREATE_GROUP_SUCCESS
} from '../actions/actionTypes/Group';

const userGroups = (state = { groups: {}, groupsById: [] }, action) => {
  switch (action.type) {
    case FETCH_USER_GROUPS_SUCCESS: {
      const groups = action.response.groups
      .reduce((accumulator, group) => {
        accumulator[group.id] = group;
        return accumulator;
      }, {});
      const groupsById = action.response.groups
      .map(group => (group.id));
      return {
        groupsById,
        groups
      };
    }
    case CREATE_GROUP_SUCCESS: {
      const group = action.response.group;
      const groups = {
        ...state.groups,
        [group.id]: group
      };
      const groupsById = [
        ...state.groupsById,
        group.id
      ];
      return {
        groups,
        groupsById
      };
    }
    default:
      return state;
  }
};

export default userGroups;
