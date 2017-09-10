import reducer from '../../reducers/unreadMessages';
import {
  GET_UNREAD_MESSAGES_SUCCESS,
  ADD_TO_UNREAD_MESSAGES
} from '../../actions/actionTypes/User';
import {
  GROUP_MESSAGES_READ
} from '../../actions/actionTypes/Group';
import { unreadMessages } from '../__mocks__/dummyData';

describe('unreadMessages reducer', () => {
  it(`should return the initial state when given
   an undefined state`, () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it(`should handle GET_UNREAD_MESSAGES_SUCCESS action by setting
  the state to include fetched unread messages`, () => {
    expect(
      reducer(unreadMessages, {
        type: GET_UNREAD_MESSAGES_SUCCESS,
        response: {
          second: ['5', '6']
        }
      })
    ).toEqual({ second: ['5', '6'] });
  });
  it(`should handle ADD_TO_UNREAD_MESSAGES action by setting the 
  state to include new unread message`, () => {
    expect(
      reducer(unreadMessages, {
        type: ADD_TO_UNREAD_MESSAGES,
        groupId: 'second',
        messageId: '6'
      })
    ).toEqual({
      first: ['3', '4'],
      second: ['4', '3', '6']
    });
  });
  it(`should handle GROUP_MESSAGES_READ action by setting 
  the value to null for the group`, () => {
    expect(
      reducer(unreadMessages, {
        type: GROUP_MESSAGES_READ,
        groupId: 'second'
      })
    ).toEqual({
      first: ['3', '4'],
      second: null
    });
  });
});
