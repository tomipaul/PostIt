import axios from 'axios';
import * as firebase from 'firebase';
import { logError } from './errorAction';
import sendRequest from './requestAction';
import {
  FETCH_USER_GROUPS_SUCCESS,
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
  window.localStorage.removeItem('auth_token');
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
    return axios.post('/api/user/signup', {
      username,
      password,
      email,
      phoneNo
    })
    .then((response) => {
      dispatch(authenticationSuccess(response.data));
    })
    .catch((error) => {
      dispatch(logError(error.response.data));
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
    return axios.post('/api/user/signin', {
      username,
      password
    })
    .then((response) => {
      dispatch(authenticationSuccess(response.data));
    })
    .catch((error) => {
      dispatch(logError(error.response.data));
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
    const token = window.localStorage.getItem('auth_token');
    return axios.get('/api/user/authorize', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      response.data.token = token;
      dispatch(authenticationSuccess(response.data));
    })
    .catch((error) => {
      dispatch(logError(error.response.data));
    });
  };
}
/**
 * async helper function: fetch all groups a user belong to
 * @function fetchUserGroups
 * @returns {function} aaynchronous action
 */
export function fetchUserGroups() {
  return (dispatch) => {
    const token = window.localStorage.getItem('auth_token');
    dispatch(sendRequest());
    return axios.get('/api/user/groups', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(fetchUserGroupsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(logError(error.response.data));
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
    const token = window.localStorage.getItem('auth_token');
    dispatch(sendRequest());
    return axios.get(`/api/user/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(getUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch(logError(error.response.data));
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
    const token = window.localStorage.getItem('auth_token');
    dispatch(sendRequest());
    return axios.put(`/api/user/${auth.user.username}`, {
      ...newCredentials
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      dispatch(updateUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch(logError(error.response.data));
    });
  };
}
/**
 * async helper function: delete a user account
 * @function fetchUserGroups
 * @returns {function} asynchronous action
 */
export function deleteUser() {
  return (dispatch, getState) => {
    const { auth } = getState();
    const token = window.localStorage.getItem('auth_token');
    dispatch(sendRequest());
    return axios.delete(`/api/user/${auth.user.username}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      dispatch(deleteUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch(logError(error.response.data));
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
    .catch(() => {
      dispatch(logError({ error: 'Upload failed!' }));
    });
  };
}
