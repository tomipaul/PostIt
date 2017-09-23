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
  GET_GROUP_MESSAGES_SUCCESS,
  GROUP_MESSAGES_READ,
  GET_USERS_WITH_MESSAGE_READ_SUCCESS
} from '../actionTypes/Group';

/**
 * create action: select a group
 * @function selectGroup
 * @param {string} groupId
 * @returns {object} action: type and groupId
 */
export function selectGroup(groupId) {
  window.localStorage.setItem('last_viewed', groupId);
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

/**
 * create action: read unread group messages: success
 * @function readGroupMessagesSuccess
 * @param {string} groupId
 * @returns {object} action: type
 */
export function groupMessagesRead(groupId) {
  return {
    type: GROUP_MESSAGES_READ,
    groupId
  };
}

/**
 * create action: get all users that have read a message: success
 * @function getUsersWithMessageReadSuccess
 * @param {object} response
 * @param {string} messageId
 * @returns {object} action: type and response
 */
export function getUsersWithMessageReadSuccess(response, messageId) {
  return {
    type: GET_USERS_WITH_MESSAGE_READ_SUCCESS,
    response,
    messageId
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
    return axios.post('/api/v1/group', {
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
      dispatch(showErrorNotification({ error }));
    });
  };
}

/**
 * async helper function: add a user to a group
 * @function addUserToGroup
 * @param {string} username
 * @returns {function} asynchronous action
 */
export function addUserToGroup(username) {
  return (dispatch, getState) => {
    const state = getState();
    const token = window.localStorage.getItem('auth_token');
    const groupId = state.activeGroup;
    dispatch(sendRequest());
    return axios.post(`/api/v1/group/${groupId}/user`, {
      username
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(addUserToGroupSuccess(response.data));
      dispatch(showSuccessNotification({ response }));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}

/**
 * async helper function: post message to a group
 * @function addMessageToGroup
 * @param {object} message
 * @returns {function} asynchronous action
 */
export function addMessageToGroup(message) {
  return (dispatch, getState) => {
    const state = getState();
    const token = window.localStorage.getItem('auth_token');
    const groupId = state.activeGroup;
    dispatch(sendRequest());
    return axios.post(`/api/v1/group/${groupId}/message`, message, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(showSuccessNotification({ response }));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}

/**
 * async helper function: remove a user from a group
 * @function removeUserFromGroup
 * @param {string} username
 * @returns {function} asynchronous action
 */
export function removeUserFromGroup(username) {
  return (dispatch, getState) => {
    const state = getState();
    const token = window.localStorage.getItem('auth_token');
    const groupId = state.activeGroup;
    dispatch(sendRequest());
    return axios.delete(`/api/v1/group/${groupId}/user/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(removeUserFromGroupSuccess(response.data));
      dispatch(showSuccessNotification({ response }));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}

/**
 * async helper function: get all users in a group
 * @function getGroupUsers
 * @returns {function} asynchronous action
 */
export function getGroupUsers() {
  return (dispatch, getState) => {
    const state = getState();
    const token = window.localStorage.getItem('auth_token');
    const groupId = state.activeGroup;
    dispatch(sendRequest());
    return axios.get(`/api/v1/group/${groupId}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(getGroupUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}

/**
 * async helper function: get all messages posted to a group
 * @function getGroupMessages
 * @returns {function} asynchronous action
 */
export function getGroupMessages() {
  return (dispatch, getState) => {
    const state = getState();
    const token = window.localStorage.getItem('auth_token');
    const groupId = state.activeGroup;
    dispatch(sendRequest());
    return axios.get(`/api/v1/group/${groupId}/messages`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      dispatch(getGroupMessagesSuccess(response.data));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });
  };
}

/**
 * async helper function: read all unread group messages
 * @function readUnreadGroupMessages
 * @returns {function} asynchronous action
 */
export function readUnreadGroupMessages() {
  return (dispatch, getState) => {
    const state = getState();
    const {
      activeGroup,
      unreadMessages
    } = state;
    const unreadMessagesArray = unreadMessages[activeGroup];
    return axios.post(`/api/v1/group/${activeGroup}/messages/read`,
      { messages: unreadMessagesArray }
    )
    .then(() => {
      dispatch(groupMessagesRead(activeGroup));
    })
    .catch(() => {
      dispatch(showErrorNotification({
        message: 'Request errored out, Please try again'
      }));
    });
  };
}

/**
 * async helper function: get all users that have read a message
 * @param {string} messageId
 * @returns {function} asynchronous action
 */
export function getUsersWithMessageRead(messageId) {
  return (dispatch, getState) => {
    const state = getState();
    const groupId = state.activeGroup;
    return axios.get(`/api/v1/group/${groupId}/message/${messageId}/users`)
    .then((response) => {
      dispatch(getUsersWithMessageReadSuccess(response.data, messageId));
    })
    .catch(() => {
      dispatch(showErrorNotification({
        message: 'Request failed, Please try again'
      }));
    });
  };
}

