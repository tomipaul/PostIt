import reducer from '../../reducers/selectedUser';
import * as types from '../../actions/actionTypes/User';

const user = {
  username: 'tomipaul',
  email: 'tomi@paul.com',
  phoneNo: '00009992992',
  status: 'user'
};

describe('selectedUser reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('should handle SELECT_USER', () => {
    expect(
      reducer({}, {
        type: types.SELECT_USER,
        user
      })
    ).toEqual(user);
  });
  it('should handle CLEAR_SELECTED_USER', () => {
    expect(
      reducer(user, {
        type: types.CLEAR_SELECTED_USER,
      })
    ).toEqual({});
  });
  it('should handle GET_USER_SUCCESS', () => {
    expect(
      reducer({}, {
        type: types.GET_USER_SUCCESS,
        response: { user }
      })
    ).toEqual(user);
  });
  it('should handle DELETE_USER_SUCCESS', () => {
    expect(
      reducer({ username: user.username }, {
        type: types.DELETE_USER_SUCCESS,
        response: { username: user.username }
      })
    ).toEqual({});
  });
  it('should handle UPDATE_USER_SUCCESS', () => {
    expect(
      reducer({ username: user.username }, {
        type: types.UPDATE_USER_SUCCESS,
        response: { user }
      })
    ).toEqual(user);
  });
});
