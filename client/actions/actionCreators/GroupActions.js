import axios from 'axios';
import sendRequest from './requestAction';
import {
  showErrorNotification,
  showSuccessNotification
} from './helpers';
import {
  SELECT_GROUP,
  CREATE_GROUP_SUCCESS,
  ADD_USER_TO_GROUP_SUCCESS,
  ADD_MESSAGE_TO_GROUP_SUCCESS,
  REMOVE_USER_FROM_GROUP_SUCCESS,
  GET_GROUP_USERS_SUCCESS,
  GET_GROUP_MESSAGES_SUCCESS
} from '../actionTypes/Group';

/**
 * create action: select a group
 * @function selectGroup
 * @param {string} groupId
 * @returns {object} action: type and groupId
 */
export function selectGroup(groupId) {
  return {
    type: SELECT_GROUP,
    groupId
  };
}

/**
 * create action: create a group: success
 * @function createGroupSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function createGroupSuccess(response) {
  return {
    type: CREATE_GROUP_SUCCESS,
    response
  };
}

/**
 * create action : add a user to a group: success
 * @function addUserToGroupSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function addUserToGroupSuccess(response) {
  return {
    type: ADD_USER_TO_GROUP_SUCCESS,
    response
  };
}

/**
 * create action : add a message to group: success
 * @function addMessageToGroupSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function addMessageToGroupSuccess(response) {
  return {
    type: ADD_MESSAGE_TO_GROUP_SUCCESS,
    response
  };
}

/**
 * create action : remove a user from a group: success
 * @function removeUserFromGroupSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function removeUserFromGroupSuccess(response) {
  return {
    type: REMOVE_USER_FROM_GROUP_SUCCESS,
    response
  };
}

/**
 * create action: get all users in a group: success
 * @function getGroupUsersSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function getGroupUsersSuccess(response) {
  return {
    type: GET_GROUP_USERS_SUCCESS,
    response
  };
}

/**
 * create action: get all messages posted to a group: success
 * @function getGroupMessagesSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function getGroupMessagesSuccess(response) {
  return {
    type: GET_GROUP_MESSAGES_SUCCESS,
    response
  };
}

/* ----------------------------------------- */
/* Asynchronous action creators using thunk */
/**
 * async helper function: create a group
 * @function createGroup
 * @param {string} name
 * @param {string} description
 * @returns {function} asynchronous action
 */
export function createGroup(name, description) {
  return (dispatch) => {
    const token = window.localStorage.getItem('auth_token');
    dispatch(sendRequest());
    return axios.post('/api/group', {
      name,
      description
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(createGroupSuccess(response.data));
      dispatch(showSuccessNotification({ response }));
    })
    .catch((error) => {
      dispatch(showErrorNotification(error));
    });
  };
}

/**
 * async helper function: add a user to a group
 * @function addUserToGroup
 * @param {string} username
 * @param {string} groupId
 * @returns {function} asynchronous action
 */
export function addUserToGroup(username) {
  return (dispatch, getState) => {
    const state = getState();
    const token = window.localStorage.getItem('auth_token');
    const groupId = state.activeGroup;
    dispatch(sendRequest());
    return axios.post(`/api/group/${groupId}/user`, {
      username
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(addUserToGroupSuccess(response.data));
      dispatch(showSuccessNotification({ response }));
    })
    .catch((error) => {
      dispatch(showErrorNotification(error));
    });
  };
}

/**
 * async helper function: post message to a group
 * @function addMessageToGroup
 * @param {object} message
 * @param {string} groupId
 * @returns {function} asynchronous action
 */
export function addMessageToGroup(message) {
  return (dispatch, getState) => {
    const state = getState();
    const token = window.localStorage.getItem('auth_token');
    const groupId = state.activeGroup;
    dispatch(sendRequest());
    return axios.post(`/api/group/${groupId}/message`, message, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(showSuccessNotification({ response }));
    })
    .catch((error) => {
      dispatch(showErrorNotification(error));
    });
  };
}

/**
 * async helper function: remove a user from a group
 * @function removeUserFromGroup
 * @param {string} username
 * @param {string} groupId
 * @returns {function} asynchronous action
 */
export function removeUserFromGroup(username) {
  return (dispatch, getState) => {
    const state = getState();
    const token = window.localStorage.getItem('auth_token');
    const groupId = state.activeGroup;
    dispatch(sendRequest());
    return axios.delete(`/api/group/${groupId}/user/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(removeUserFromGroupSuccess(response.data));
      dispatch(showSuccessNotification({ response }));
    })
    .catch((error) => {
      dispatch(showErrorNotification(error));
    });
  };
}

/**
 * async helper function: get all users in a group
 * @function getGroupUsers
 * @param {string} groupId
 * @returns {function} asynchronous action
 */
export function getGroupUsers() {
  return (dispatch, getState) => {
    const state = getState();
    const token = window.localStorage.getItem('auth_token');
    const groupId = state.activeGroup;
    dispatch(sendRequest());
    return axios.get(`/api/group/${groupId}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(getGroupUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(showErrorNotification(error));
    });
  };
}

/**
 * async helper function: get all messages posted to a group
 * @function getGroupMessages
 * @param {string} groupId
 * @returns {function} asynchronous action
 */
export function getGroupMessages() {
  return (dispatch, getState) => {
    const state = getState();
    const token = window.localStorage.getItem('auth_token');
    const groupId = state.activeGroup;
    dispatch(sendRequest());
    return axios.get(`/api/group/${groupId}/messages`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(getGroupMessagesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(showErrorNotification(error));
    });
  };
}

