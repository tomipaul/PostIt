import reducer from '../../reducers/auth';
import {
  AUTHENTICATION_SUCCESS,
  UPDATE_USER_SUCCESS
} from '../../actions/actionTypes/User';

const user = {
  username: 'tomipaul',
  email: 'tomi@paul.com',
  phoneNo: '00009992992',
  status: 'user',
  photoURL: '/images/silhouette.jpeg'
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthenticated: false,
      user: {
        photoURL: '/images/silhouette.jpeg'
      }
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
    const { username, status, photoURL } = user;
    const updatedUser = {
      username,
      status,
      photoURL,
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
});
