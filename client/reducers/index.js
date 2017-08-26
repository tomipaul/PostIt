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

const rootReducer = combineReducers({
  auth,
  users,
  logError,
  notifs,
  requestCount,
  selectedUser,
  userGroups,
  activeGroup,
  activeGroupMessages,
  activeGroupUsers
});

export default rootReducer;
