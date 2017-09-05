import reducer from '../../reducers/users';
import {
  GET_ALL_USERS_SUCCESS
} from '../../actions/actionTypes/User';

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

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  it('should handle GET_ALL_USERS_SUCCESS', () => {
    expect(
      reducer([], {
        type: GET_ALL_USERS_SUCCESS,
        response: { users }
      })
    ).toEqual({ users });
  });
});
