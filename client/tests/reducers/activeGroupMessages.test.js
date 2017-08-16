import reducer from '../../reducers/activeGroupMessages';
import {
  GET_GROUP_MESSAGES_SUCCESS,
  ADD_MESSAGE_TO_GROUP_SUCCESS
} from '../../actions/actionTypes/Group';

const messages = [
  {
    text: 'First message',
    priority: 'normal'
  },
  {
    text: 'Second message',
    priority: 'critical'
  }
];

describe('activeGroupMessages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  it('should handle GET_GROUP_MESSAGES_SUCCESS', () => {
    expect(
      reducer([], {
        type: GET_GROUP_MESSAGES_SUCCESS,
        response: { messages }
      })
    ).toEqual(messages);
  });
  it('should handle ADD_MESSAGE_TO_GROUP_SUCCESS', () => {
    const message = [messages[0]];
    expect(
      reducer(message, {
        type: ADD_MESSAGE_TO_GROUP_SUCCESS,
        response: { createdMessage: messages[1] }
      })
    ).toEqual(messages);
  });
});

