import {
  SELECT_USER,
  GET_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  CLEAR_SELECTED_USER
} from '../actions/actionTypes/User';

const selectedUser = (state = {}, action) => {
  switch (action.type) {
    case SELECT_USER: {
      return { ...action.user };
    }
    case CLEAR_SELECTED_USER: {
      return {};
    }
    case GET_USER_SUCCESS: {
      return { ...action.response.user };
    }
    case DELETE_USER_SUCCESS: {
      const username = action.response.username;
      if (username === state.username) {
        return {};
      }
      break;
    }
    case UPDATE_USER_SUCCESS: {
      const updatedUser = action.response.user;
      if (updatedUser.username === state.username) {
        return { ...updatedUser };
      }
      return state;
    }
    default:
      return state;
  }
};

export default selectedUser;