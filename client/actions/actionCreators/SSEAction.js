import { showInfoNotification } from './helpers';
import SUBSCRIBE_TO_MESSAGES_SUCCESS from '../actionTypes/sse';
import {
  addMessageToGroupSuccess,
  readUnreadGroupMessages
} from './GroupActions';
import { addToUnreadMessages } from './UserActions';
import sendRequest from './requestAction';

/**
 * create action: subscribe to messages: success
 * @function createGroupSuccess
 * @param {object} response
 * @returns {object} action: type and response
 */
export function subscribeToMessagesSuccess() {
  return {
    type: SUBSCRIBE_TO_MESSAGES_SUCCESS
  };
}

/**
 * async helper function: subscribe to receive
 * new messages in the dashbaord
 * @function subscribeToMessages
 * @returns {void}
 */
export function subscribeToMessages() {
  const eventSource = (dispatch, getState) => {
    const token = window.localStorage.getItem('auth_token');
    const source = new window
    .EventSource(`/api/stream?token=${token}`);
    dispatch(sendRequest());
    source.addEventListener('open', () => {
      dispatch(subscribeToMessagesSuccess());
    }, false);
    source.addEventListener('message', (e) => {
      const state = getState();
      const newMessage = JSON.parse(e.data);
      const author = newMessage.AuthorUsername;
      const recipientGroupId = newMessage.GroupId;
      const activeGroup = state.activeGroup;
      const recipientGroup = state
      .userGroups.groups[recipientGroupId];
      if (recipientGroup) {
        if (recipientGroupId === activeGroup) {
          dispatch(addMessageToGroupSuccess({
            createdMessage: newMessage
          }));
          if (author !== state.auth.user.username) {
            dispatch(addToUnreadMessages({
              groupId: recipientGroupId,
              messageId: newMessage.id
            }));
            dispatch(readUnreadGroupMessages());
          }
        } else {
          dispatch(addToUnreadMessages({
            groupId: recipientGroupId,
            messageId: newMessage.id
          }));
        }
        if (author !== state.auth.user.username) {
          dispatch(showInfoNotification({
            message: `${author} posted a message to ${recipientGroup.name}`
          }));
        }
      }
    }, false);
    source.addEventListener('error', (e) => {
      if (e.target.readyState === window.EventSource.CLOSED) {
        eventSource(dispatch, getState);
      }
    }, false);
    return source;
  };

  return (dispatch, getState) => {
    if (window.EventSource) {
      let source = eventSource(dispatch, getState);
      setInterval(() => {
        if (source.readyState === window.EventSource.CLOSED) {
          source.close();
          source = eventSource(dispatch, getState);
        }
      }, 1000);
    }
  };
}
