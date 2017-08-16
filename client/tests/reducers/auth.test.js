import reducer from '../../reducers/auth';
import {
  AUTHENTICATION_SUCCESS,
  LOG_OUT_SUCCESS,
  UPDATE_USER_SUCCESS
} from '../../actions/actionTypes/User';

const user = {
  username: 'tomipaul',
  email: 'tomi@paul.com',
  phoneNo: '00009992992',
  status: 'user'
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticated: false,
      user: {}
    });
  });
  it('should handle AUTHENTICATION_SUCCESS', () => {
    expect(
      reducer({}, {
        type: AUTHENTICATION_SUCCESS,
        response: { user }
      })
    ).toEqual({
      isAuthenticated: true,
      user
    });
  });
  it('should handle UPDATE_USER_SUCCESS', () => {
    const { username, status } = user;
    const updatedUser = {
      username,
      status,
      email: 'updated@user.com',
      phoneNo: 9888718778781
    };
    expect(
      reducer({ user }, {
        type: UPDATE_USER_SUCCESS,
        response: { user: updatedUser }
      })
    ).toEqual({
      isAuthenticated: true,
      user: updatedUser
    });
  });
  it('should handle LOG_OUT_SUCCESS', () => {
    expect(
      reducer({}, {
        type: LOG_OUT_SUCCESS,
      })
    ).toEqual({
      isAuthenticated: false,
      user: null
    });
  });
});
