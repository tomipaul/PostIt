import axios from 'axios';
import * as firebase from 'firebase';
import {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification
} from './helpers';
import sendRequest from './requestAction';
import {
  GET_UNREAD_MESSAGES_SUCCESS,
  ADD_TO_UNREAD_MESSAGES,
  FETCH_USER_GROUPS_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  GET_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  AUTHENTICATION_SUCCESS,
  LOG_OUT_SUCCESS,
  SELECT_USER,
  CLEAR_SELECTED_USER
} from '../actionTypes/User';

/**
 * create action: select user
 * @function selectUser
 * @param {object} user
 * @returns {object} action: type and user
 */
export function selectUser(user) {
  return {
    type: SELECT_USER,
    user
  };
}
/**
 * create action: clear selected user
 * @function clearSelectedUser
 * @returns {object} action: type
 */
export function clearSelectedUser() {
  return {
    type: CLEAR_SELECTED_USER
  };
}
/**
 * create action: authenticate user: success
 * @function authenticationSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function authenticationSuccess(response) {
  window.localStorage.setItem('auth_token', response.token);
  return {
    type: AUTHENTICATION_SUCCESS,
    response
  };
}

/**
 * create action: log out user: success
 * @function logOutSuccess
 * @returns {object} action: type
 */
export function logOutSuccess() {
  return {
    type: LOG_OUT_SUCCESS,
  };
}

/**
 * create action: get user groups: success
 * @function fetchUserGroupsSuccess
 * @param {array} response
 * @returns {object} action: type and response
 */
export function fetchUserGroupsSuccess(response) {
  return {
    type: FETCH_USER_GROUPS_SUCCESS,
    response
  };
}

/**
 * create action: get a user: success
 * @function getUserSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function getUserSuccess(response) {
  return {
    type: GET_USER_SUCCESS,
    response
  };
}

/**
 * create action: get all users: success
 * @function getAllUsersSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function getAllUsersSuccess(response) {
  return {
    type: GET_ALL_USERS_SUCCESS,
    response
  };
}

/**
 * create action: get a user: success
 * @function getUserSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function updateUserSuccess(response) {
  return {
    type: UPDATE_USER_SUCCESS,
    response
  };
}

/**
 * create action: delete a user: success
 * @function deleteUserSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function deleteUserSuccess(response) {
  return {
    type: DELETE_USER_SUCCESS,
    response
  };
}

/**
 * create action: get unread messages count: success
 * @function getUnreadMessagesCountSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function getUnreadMessagesSuccess(response) {
  return {
    type: GET_UNREAD_MESSAGES_SUCCESS,
    response
  };
}

/**
 * create action: add to the unread messages count object
 * if a new message is received while out of the group board
 * @param {string} groupId
 * @function addToUnreadCountObject
 * @returns {object} action: type
 */
export function addToUnreadMessages({ groupId, messageId }) {
  return {
    type: ADD_TO_UNREAD_MESSAGES,
    groupId,
    messageId
  };
}

/* ----------------------------------------- */
/* Asynchronous action creators using thunk */
/**
 * async helper function: sign up user
 * @function signUpUser
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @param {string} phoneNo
 * @returns {function} asynchronous action
 */
export function signUpUser(username, password, email, phoneNo) {
  return (dispatch) => {
    dispatch(sendRequest());
    return axios.post('/api/v0/user/signup', {
      username,
      password,
      email,
      phoneNo
    })
    .then((response) => {
      dispatch(authenticationSuccess(response.data));
      dispatch(showSuccessNotification({ response }));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}
/**
 * async helper function: sign in user
 * @function signInUser
 * @param {string} username
 * @param {string} password
 * @returns {function} asynchronous action
 */
export function signInUser(username, password) {
  return (dispatch) => {
    dispatch(sendRequest());
    return axios.post('/api/v0/user/signin', {
      username,
      password
    })
    .then((response) => {
      dispatch(authenticationSuccess(response.data));
      dispatch(showSuccessNotification({ response }));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}
/**
 * async helper function: validate user token
 * @function validateUserToken
 * @returns {function} aaynchronous action
 */
export function validateUserToken() {
  return (dispatch) => {
    dispatch(sendRequest());
    return axios.get('/api/v0/user/authorize')
    .then((response) => {
      response.data.token = window.localStorage.getItem('auth_token');
      dispatch(authenticationSuccess(response.data));
    })
    .catch(() => {
      dispatch(showErrorNotification({
        message: 'Validation failed!'
      }));
    });
  };
}
/**
 * async helper function: log out user
 * @function logOutUser
 * @returns {function} asynchronous action
 */
export function logOutUser() {
  return (dispatch) => {
    dispatch(sendRequest());
    dispatch(logOutSuccess());
    window.localStorage.removeItem('auth_token');
    window.localStorage.removeItem('last_viewed');
    dispatch(showSuccessNotification({
      message: 'Log out successful'
    }));
  };
}
/**
 * async helper function: fetch all groups a user belong to
 * @function fetchUserGroups
 * @returns {function} aaynchronous action
 */
export function fetchUserGroups() {
  return (dispatch) => {
    dispatch(sendRequest());
    return axios.get('/api/v0/user/groups')
    .then((response) => {
      const groups = response.data.groups
      .reduce((accumulator, group) => {
        accumulator[group.id] = group;
        return accumulator;
      }, {});
      const groupsById = response.data.groups
      .map(group => (group.id));
      dispatch(fetchUserGroupsSuccess({ groupsById, groups }));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}
/**
 * aync helper function: get a user
 * @function getUser
 * @param {string} username
 * @returns {function} asynchronous action
 */
export function getUser(username) {
  return (dispatch) => {
    dispatch(sendRequest());
    return axios.get(`/api/v0/user/${username}`)
    .then((response) => {
      dispatch(getUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}
/**
 * aync helper function: get all users
 * @function getAllUsers
 * @returns {function} asynchronous action
 */
export function getAllUsers() {
  return (dispatch) => {
    dispatch(sendRequest());
    return axios.get('/api/v0/users')
    .then((response) => {
      dispatch(getAllUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}
/**
 * async helper function: update a user account
 * @function updateUser
 * @param {object} newCredentials
 * @returns {function} asynchronous action
 */
export function updateUser(newCredentials) {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch(sendRequest());
    return axios.put(`/api/v0/user/${auth.user.username}`, {
      ...newCredentials
    }).then((response) => {
      dispatch(updateUserSuccess(response.data));
      dispatch(showSuccessNotification({ response }));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}
/**
 * async helper function: send reset password mail to a user
 * @function sendPasswordResetMail
 * @param {string} email user email address
 * @returns {function} asynchronous action
 */
export function sendPasswordResetMail(email) {
  return (dispatch =>
    axios.post('/api/v0/password/mail', {
      recipient: email
    })
    .then(() => {
      dispatch(showInfoNotification({
        message: 'A message has been sent to your mail'
      }));
    })
    .catch((error) => {
      (error.response.data.error === 'Error! User does not exist')
      ? dispatch(showErrorNotification({
        message: 'No matching user found for the provided mail'
      }))
      : dispatch(showErrorNotification({
        message: 'Something went wrong!'
      }));
    })
  );
}
/**
 * async helper function: reset user password
 * @function resetPassword
 * @param {string} newPassword
 * @returns {function} asynchronous action
 */
export function resetPassword({ password, token }) {
  return (dispatch =>
    axios.post('/api/v0/user/password/reset', {
      password
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      dispatch(showSuccessNotification({
        message: 'Password reset successful'
      }));
    })
    .catch(() => {
      dispatch(showErrorNotification({
        message: 'Something went wrong!'
      }));
    })
  );
}
/**
 * async helper function: delete a user account
 * @function fetchUserGroups
 * @returns {function} asynchronous action
 */
export function deleteUser() {
  return (dispatch, getState) => {
    const { auth } = getState();
    dispatch(sendRequest());
    return axios.delete(`/api/v0/user/${auth.user.username}`)
    .then((response) => {
      dispatch(deleteUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}
/**
 * async helper function: get unread messages count
 * @function getUnreadMessagesCount
 * @returns {function} asynchronous action
 */
export function getUnreadMessages() {
  return (dispatch) => {
    dispatch(sendRequest());
    return axios.get('/api/v0/messages/unread')
    .then((response) => {
      dispatch(getUnreadMessagesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}
/**
 * async helper function: upload profile picture
 * @function updateProfilePicture
 * @param {object} image: uploaded image object
 * @returns {function} asynchronous action
 */
export function updateProfilePicture(image) {
  return (dispatch) => {
    const imageRef = firebase.storage()
    .ref().child(`images/${image.name}`);
    return imageRef.put(image)
    .then((snapshot) => {
      dispatch(updateUser({
        photoURL: snapshot.downloadURL
      }));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}
