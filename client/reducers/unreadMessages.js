import {
  GET_UNREAD_MESSAGES_SUCCESS,
  ADD_TO_UNREAD_MESSAGES
} from '../actions/actionTypes/User';
import {
  GROUP_MESSAGES_READ
} from '../actions/actionTypes/Group';

const unreadMessages = (state = {}, action) => {
  switch (action.type) {
    case GET_UNREAD_MESSAGES_SUCCESS: {
      return action.response;
    }
    case ADD_TO_UNREAD_MESSAGES: {
      return {
        ...state,
        [action.groupId]: [
          ...state[action.groupId] || [],
          action.messageId
        ]
      };
    }
    case GROUP_MESSAGES_READ: {
      return {
        ...state,
        [action.groupId]: null
      };
    }
    default:
      return state;
  }
};

export default unreadMessages;
