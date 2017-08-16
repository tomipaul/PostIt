import reducer from '../../reducers/activeGroupUsers';
import {
  GET_GROUP_USERS_SUCCESS,
  ADD_USER_TO_GROUP_SUCCESS,
  REMOVE_USER_FROM_GROUP_SUCCESS
} from '../../actions/actionTypes/Group';

const users = [
  {
    username: 'tomipaul',
    email: 'tomi@paul.com',
    phoneNo: '00009992992',
    status: 'user'
  },
  {
    username: 'emeka',
    email: 'emeka@andela.com',
    phoneNo: '0567577785875',
    status: 'user'
  },
];

describe('activeGroupUsers reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  it('should handle GET_GROUP_USERS_SUCCESS', () => {
    expect(
      reducer([], {
        type: GET_GROUP_USERS_SUCCESS,
        response: { users }
      })
    ).toEqual(users);
  });
  it('should handle ADD_USER_TO_GROUP_SUCCESS', () => {
    const user = [users[0]];
    expect(
      reducer(user, {
        type: ADD_USER_TO_GROUP_SUCCESS,
        response: { user: users[1] }
      })
    ).toEqual(users);
  });
  it('should handle REMOVE_USER_FROM_GROUP_SUCCESS', () => {
    const user = users[0];
    expect(
      reducer(users, {
        type: REMOVE_USER_FROM_GROUP_SUCCESS,
        response: { username: user.username }
      })
    ).toEqual([users[1]]);
  });
});

