import { combineReducers } from 'redux';
import logError from './logError';
import auth from './auth';
import selectedUser from './selectedUser';
import activeGroup from './activeGroup';
import activeGroupMessages from './activeGroupMessages';
import activeGroupUsers from './activeGroupUsers';
import userGroups from './userGroups.js';
import requestCount from './request.js';

const rootReducer = combineReducers({
  auth,
  logError,
  requestCount,
  selectedUser,
  userGroups,
  activeGroup,
  activeGroupMessages,
  activeGroupUsers
});

export default rootReducer;
