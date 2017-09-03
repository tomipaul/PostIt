import {
  GET_USERS_WITH_MESSAGE_READ_SUCCESS
} from '../actions/actionTypes/Group';

const usersWithMessageRead = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_WITH_MESSAGE_READ_SUCCESS: {
      const users = action.response.users.map(userMessage =>
        (userMessage.UserUsername)
      );
      return {
        ...state,
        [action.messageId]: users
      };
    }
    default:
      return state;
  }
};

export default usersWithMessageRead;
