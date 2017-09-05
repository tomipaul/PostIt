import reducer from '../../reducers/unreadMessages';
import {
  GET_UNREAD_MESSAGES_SUCCESS,
  ADD_TO_UNREAD_MESSAGES
} from '../../actions/actionTypes/User';
import {
  GROUP_MESSAGES_READ
} from '../../actions/actionTypes/Group';

const state = {
  first: ['3', '4'],
  second: ['4', '3']
};

describe('unreadMessages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('should handle GET_UNREAD_MESSAGES_SUCCESS', () => {
    expect(
      reducer(state, {
        type: GET_UNREAD_MESSAGES_SUCCESS,
        response: {
          second: ['5', '6']
        }
      })
    ).toEqual({ second: ['5', '6'] });
  });
  it('should handle ADD_TO_UNREAD_MESSAGES', () => {
    expect(
      reducer(state, {
        type: ADD_TO_UNREAD_MESSAGES,
        groupId: 'second',
        messageId: '6'
      })
    ).toEqual({
      first: ['3', '4'],
      second: ['4', '3', '6']
    });
  });
  it('should handle GROUP_MESSAGES_READ', () => {
    expect(
      reducer(state, {
        type: GROUP_MESSAGES_READ,
        groupId: 'second'
      })
    ).toEqual({
      first: ['3', '4'],
      second: null
    });
  });
});
