import { combineReducers } from 'redux';
import { reducer as notifs } from 'redux-notifications';
import logError from './logError';
import auth from './auth';
import selectedUser from './selectedUser';
import activeGroup from './activeGroup';
import activeGroupMessages from './activeGroupMessages';
import activeGroupUsers from './activeGroupUsers';
import userGroups from './userGroups.js';
import requestCount from './request.js';
import users from './users.js';
import unreadMessages from './unreadMessages.js';
import { LOG_OUT_SUCCESS } from '../actions/actionTypes/User';

const appReducer = combineReducers({
  auth,
  users,
  logError,
  notifs,
  requestCount,
  selectedUser,
  userGroups,
  activeGroup,
  activeGroupMessages,
  activeGroupUsers,
  unreadMessages
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
