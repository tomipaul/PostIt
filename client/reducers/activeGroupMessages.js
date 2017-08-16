import {
  ADD_MESSAGE_TO_GROUP_SUCCESS,
  GET_GROUP_MESSAGES_SUCCESS
} from '../actions/actionTypes/Group';

const activeGroupMessages = (state = [], action) => {
  switch (action.type) {
    case GET_GROUP_MESSAGES_SUCCESS: {
      const messages = action.response.messages;
      return messages;
    }
    case ADD_MESSAGE_TO_GROUP_SUCCESS: {
      const createdMessage = action.response.createdMessage;
      return [
        ...state,
        createdMessage
      ];
    }
    default:
      return state;
  }
};

export default activeGroupMessages;
