import {
  ADD_USER_TO_GROUP_SUCCESS,
  REMOVE_USER_FROM_GROUP_SUCCESS,
  GET_GROUP_USERS_SUCCESS,
} from '../actions/actionTypes/Group';

const activeGroupUsers = (state = [], action) => {
  switch (action.type) {
    case GET_GROUP_USERS_SUCCESS: {
      const groupUsers = action.response.users
      .reduce((usersArray, user) => {
        return usersArray.concat(user);
      }, []);
      return groupUsers;
    }
    case ADD_USER_TO_GROUP_SUCCESS: {
      return [
        ...state,
        action.response.user
      ];
    }
    case REMOVE_USER_FROM_GROUP_SUCCESS: {
      const groupUsers = [...state];
      const indexOfRemovedUser = groupUsers
      .findIndex((user) => {
        return user.username === action.response.username;
      });
      groupUsers.splice(indexOfRemovedUser, 1);
      return groupUsers;
    }
    default:
      return state;
  }
};

export default activeGroupUsers;
