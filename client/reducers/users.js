import {
  GET_ALL_USERS_SUCCESS
} from '../actions/actionTypes/User';

const users = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export default users;
