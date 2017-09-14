import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../actions/actionCreators/UserActions';
import * as userActionTypes from '../../actions/actionTypes/User';
import localStorageMock from '../__mocks__/localStorage';
import { sendRequest, notifSend } from '../__mocks__/commonActions';
import {
  user,
  unreadMessages,
  allUsers,
  group
} from '../__mocks__/dummyData';

window.localStorage = localStorageMock;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User synchronous actions', () => {
  describe('action selectUser', () => {
    it('should create an action to select a user', () => {
      const expectedAction = {
        type: userActionTypes.SELECT_USER,
        user
      };
      expect(actions.selectUser(user)).toEqual(expectedAction);
    });
  });

  describe('action clearSelectedUser', () => {
    it('should create an action to clear a selected user', () => {
      const expectedAction = {
        type: userActionTypes.CLEAR_SELECTED_USER
      };
      expect(actions.clearSelectedUser()).toEqual(expectedAction);
    });
  });

  describe('action logOutSuccess', () => {
    it('should create an action when a user logs out', () => {
      const expectedAction = {
        type: userActionTypes.LOG_OUT_SUCCESS
      };
      expect(actions.logOutSuccess()).toEqual(expectedAction);
    });
  });

  describe('action addToUnreadMessages', () => {
    it('should create an action when a new message comes in', () => {
      const expectedAction = {
        type: userActionTypes.ADD_TO_UNREAD_MESSAGES,
        groupId: '23',
        messageId: '23'
      };
      expect(actions.addToUnreadMessages({
        groupId: '23',
        messageId: '23'
      })).toEqual(expectedAction);
    });
  });
});
describe('User async actions', () => {
  describe('async action signUpUser', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates AUTHENTICATION_SUCCESS when user signup is successful',
    () => {
      const { username, email, phoneNo, password } = user;
      nock('http://localhost')
      .post('/api/user/signup')
      .reply(200, {
        user: { username, email, phoneNo },
        token: '12234432653553232'
      });
      const expectedActions = [
        sendRequest,
        {
          type: userActionTypes.AUTHENTICATION_SUCCESS,
          response: {
            user: { username, email, phoneNo },
            token: '12234432653553232'
          }
        },
        notifSend('success')
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .signUpUser(username, password, email, phoneNo))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIFY_SEND when user signup fails',
    () => {
      const { username, email, phoneNo, password } = user;
      nock('http://localhost')
      .post('/api/user/signup')
      .reply(400, {
        error: 'Username can only contain letters and numbers'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'Username can only contain letters and numbers')
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .signUpUser(username, password, email, phoneNo))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action signInUser', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates AUTHENTICATION_SUCCESS when user signin is successful',
    () => {
      const { username, email, phoneNo, password } = user;
      nock('http://localhost')
      .post('/api/user/signin')
      .reply(200, {
        user: { username, email, phoneNo },
        token: '12234432653553232'
      });
      const expectedActions = [
        sendRequest,
        {
          type: userActionTypes.AUTHENTICATION_SUCCESS,
          response: {
            user: { username, email, phoneNo },
            token: '12234432653553232'
          }
        },
        notifSend('success')
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .signInUser(username, password))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIFY_SEND when user signin fails',
    () => {
      const { username, password } = user;
      nock('http://localhost')
      .post('/api/user/signin')
      .reply(400, {
        error: 'Invalid username'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'Invalid username')
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .signInUser(username, password))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action validateUser', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates AUTHENTICATION_SUCCESS when user token is validated',
    () => {
      const { username, email, phoneNo, token } = user;
      nock('http://localhost')
      .get('/api/user/authorize')
      .reply(200, {
        auth: { username, email, phoneNo },
      });
      const expectedActions = [
        sendRequest,
        {
          type: userActionTypes.AUTHENTICATION_SUCCESS,
          response: {
            auth: { username, email, phoneNo },
            token
          }
        }
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .validateUserToken())
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIFY_SEND when token validation fails',
    () => {
      nock('http://localhost')
      .get('/api/user/authorize')
      .reply(400);
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'Validation failed!')
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .validateUserToken())
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action fetchUserGroups', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates FETCH_USER_GROUPS_SUCCESS when groups are fetched',
    () => {
      nock('http://localhost')
      .get('/api/user/groups')
      .reply(200, {
        groups: [group]
      });
      const expectedActions = [
        sendRequest,
        {
          type: userActionTypes.FETCH_USER_GROUPS_SUCCESS,
          response: {
            groups: { [group.id]: group },
            groupsById: [group.id]
          }
        }
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .fetchUserGroups())
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIFY_SEND when fetching groups fail',
    () => {
      nock('http://localhost')
      .get('/api/user/groups')
      .reply(400, {
        error: 'Groups cannot be fetched'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'Groups cannot be fetched')
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .fetchUserGroups())
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action getUser', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates GET_USER_SUCCESS when getting a user is done ',
    () => {
      nock('http://localhost')
      .get('/api/user/tomipaul')
      .reply(200, {
        user
      });
      const expectedActions = [
        sendRequest,
        {
          type: userActionTypes.GET_USER_SUCCESS,
          response: { user }
        }
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .getUser('tomipaul'))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIFY_SEND when getting a user fails',
    () => {
      nock('http://localhost')
      .get('/api/user/thhgghg')
      .reply(400, {
        error: 'User does not exist'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'User does not exist')
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .getUser('thhgghg'))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action updateUser', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates UPDATE_USER_SUCCESS when updating a user is done ',
    () => {
      nock('http://localhost')
      .put('/api/user/tomipaul')
      .reply(200, {
        user
      });
      const expectedActions = [
        sendRequest,
        {
          type: userActionTypes.UPDATE_USER_SUCCESS,
          response: { user }
        },
        notifSend('success')
      ];
      const store = mockStore({
        auth: { user }
      });
      return store.dispatch(actions
      .updateUser(user))
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIFY_SEND when updating a user fails',
    () => {
      nock('http://localhost')
      .put('/api/user/tomipaul')
      .reply(400, {
        error: 'User could not be updated'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'User could not be updated')
      ];
      const store = mockStore({
        auth: { user }
      });
      return store.dispatch(actions
      .updateUser())
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action deleteUser', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates DELETE_USER_SUCCESS when deleting a user is done ',
    () => {
      nock('http://localhost')
      .delete('/api/user/tomipaul')
      .reply(200, {
        username: user.username
      });
      const expectedActions = [
        sendRequest,
        {
          type: userActionTypes.DELETE_USER_SUCCESS,
          response: { username: user.username }
        }
      ];
      const store = mockStore({
        auth: { user }
      });
      return store.dispatch(actions
      .deleteUser())
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIFY_SEND when deleting a user fails',
    () => {
      nock('http://localhost')
      .delete('/api/user/tomipaul')
      .reply(400, {
        error: 'User could not be deleted'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'User could not be deleted')
      ];
      const store = mockStore({
        auth: { user }
      });
      return store.dispatch(actions
      .deleteUser())
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action getUnreadMessages', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it(`creates GET_UNREAD_MESSAGES_SUCCESS when all 
    unread messages are fetched`, () => {
      nock('http://localhost')
      .get('/api/messages/unread')
      .reply(200, {
        ...unreadMessages
      });
      const expectedActions = [
        sendRequest,
        {
          type: userActionTypes.GET_UNREAD_MESSAGES_SUCCESS,
          response: { ...unreadMessages }
        }
      ];
      const store = mockStore({});
      return store.dispatch(actions
      .getUnreadMessages())
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIFY_SEND when getting unread messages fails',
    () => {
      nock('http://localhost')
      .get('/api/messages/unread')
      .reply(500, {
        error: 'Operation failed'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'Operation failed')
      ];
      const store = mockStore({});
      return store.dispatch(actions
      .getUnreadMessages())
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action getAllUsers', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it(`creates GET_ALL_USERS_SUCCESS when all 
    users are fetched`, () => {
      nock('http://localhost')
      .get('/api/users')
      .reply(200, allUsers);
      const expectedActions = [
        sendRequest,
        {
          type: userActionTypes.GET_ALL_USERS_SUCCESS,
          response: allUsers
        }
      ];
      const store = mockStore([]);
      return store.dispatch(actions
      .getAllUsers())
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIFY_SEND when getting all users fail',
    () => {
      nock('http://localhost')
      .get('/api/users')
      .reply(500, {
        error: 'Operation failed'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'Operation failed')
      ];
      const store = mockStore({});
      return store.dispatch(actions
      .getAllUsers())
      .then(() => {
        expect(store.getActions()).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action logOutUser', () => {
    it(`creates LOG_OUT_SUCCESS when user logs out
    successfully`, () => {
      const expectedActions = [
        sendRequest,
        {
          type: userActionTypes.LOG_OUT_SUCCESS
        },
        notifSend('success', 'Log out successful')
      ];
      const store = mockStore({});
      store.dispatch(actions.logOutUser());
      expect(store.getActions()).toMatchObject(expectedActions);
    });
  });
});
