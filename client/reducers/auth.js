import {
  AUTHENTICATION_SUCCESS,
  LOG_OUT_SUCCESS,
  UPDATE_USER_SUCCESS
} from '../actions/actionTypes/User';

const auth = (state = {
  isAuthenticated: false,
  user: { photoURL: '/images/silhouette.jpeg' }
}, action) => {
  switch (action.type) {
    case AUTHENTICATION_SUCCESS:
      return {
        isAuthenticated: true,
        user: {
          ...action.response.user ||
          action.response.auth,
          photoURL: action.response.user.photoURL
          || state.user.photoURL
        }
      };
    case LOG_OUT_SUCCESS:
      return {
        isAuthenticated: false,
        user: null
      };
    case UPDATE_USER_SUCCESS: {
      const updatedUser = action.response.user;
      if (updatedUser.username === state.user.username) {
        return {
          isAuthenticated: true,
          user: {
            ...state.user,
            ...updatedUser,
            photoURL: updatedUser.photoURL ||
            state.user.photoURL
          }
        };
      }
      break;
    }
    default:
      return state;
  }
};

export default auth;
