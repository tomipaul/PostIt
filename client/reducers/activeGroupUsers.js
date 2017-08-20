import {
  ADD_USER_TO_GROUP_SUCCESS,
  REMOVE_USER_FROM_GROUP_SUCCESS,
  GET_GROUP_USERS_SUCCESS,
} from '../actions/actionTypes/Group';

const activeGroupUsers = (state = [], action) => {
  switch (action.type) {
    case GET_GROUP_USERS_SUCCESS: {
      return action.response.users;
    }
    case ADD_USER_TO_GROUP_SUCCESS: {
      return [
        ...state,
        action.response.user
      ];
    }
    case REMOVE_USER_FROM_GROUP_SUCCESS: {
      return state.filter(user =>
        (user.username !== action.response.username)
      );
    }
    default:
      return state;
  }
};

export default activeGroupUsers;
