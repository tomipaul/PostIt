import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../actions/actionCreators/UserActions';
import * as userActionTypes from '../../actions/actionTypes/User';
import sendRequest from '../../actions/actionTypes/request';
import * as errorActionTypes from '../../actions/actionTypes/error';
import localStorageMock from '../__mocks__/localStorage';

window.localStorage = localStorageMock;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const user = {
  username: 'tomipaul',
  email: 'tomi@paul.com',
  phoneNo: '353275632723',
  password: '123456',
  token: '12234432653553232'
};

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
        { type: sendRequest },
        {
          type: userActionTypes.AUTHENTICATION_SUCCESS,
          response: {
            user: { username, email, phoneNo },
            token: '12234432653553232'
          }
        }
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .signUpUser(username, password, email, phoneNo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when user signup fails',
    () => {
      const { username, email, phoneNo, password } = user;
      nock('http://localhost')
      .post('/api/user/signup')
      .reply(400, {
        message: 'Username can only contain letters and numbers'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'Username can only contain letters and numbers'
          }
        }
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .signUpUser(username, password, email, phoneNo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
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
        { type: sendRequest },
        {
          type: userActionTypes.AUTHENTICATION_SUCCESS,
          response: {
            user: { username, email, phoneNo },
            token: '12234432653553232'
          }
        }
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .signInUser(username, password))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when user signin fails',
    () => {
      const { username, password } = user;
      nock('http://localhost')
      .post('/api/user/signin')
      .reply(400, {
        message: 'Invalid username'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'Invalid username'
          }
        }
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .signInUser(username, password))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
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
        { type: sendRequest },
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
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when token validation fails',
    () => {
      nock('http://localhost')
      .get('/api/user/authorize')
      .reply(400, {
        message: 'Invalid token'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'Invalid token'
          }
        }
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .validateUserToken())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
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
        groups: [
          {
            name: 'test',
            description: 'this is test'
          }
        ]
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: userActionTypes.FETCH_USER_GROUPS_SUCCESS,
          response: {
            groups: [
              {
                name: 'test',
                description: 'this is test'
              }
            ]
          }
        }
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .fetchUserGroups())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when fetching groups fail',
    () => {
      nock('http://localhost')
      .get('/api/user/groups')
      .reply(400, {
        message: 'Groups cannot be fetched'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'Groups cannot be fetched'
          }
        }
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .fetchUserGroups())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
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
        { type: sendRequest },
        {
          type: userActionTypes.GET_USER_SUCCESS,
          response: { user }
        }
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .getUser('tomipaul'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when getting a user fails',
    () => {
      nock('http://localhost')
      .get('/api/user/thhgghg')
      .reply(400, {
        message: 'Invalid user'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'Invalid user'
          }
        }
      ];
      const store = mockStore({ auth: {} });
      return store.dispatch(actions
      .getUser('thhgghg'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
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
        { type: sendRequest },
        {
          type: userActionTypes.UPDATE_USER_SUCCESS,
          response: { user }
        }
      ];
      const store = mockStore({
        auth: { user }
      });
      return store.dispatch(actions
      .updateUser(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when updating a user fails',
    () => {
      nock('http://localhost')
      .put('/api/user/tomipaul')
      .reply(400, {
        message: 'User could not be updated'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'User could not be updated'
          }
        }
      ];
      const store = mockStore({
        auth: { user }
      });
      return store.dispatch(actions
      .updateUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
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
        { type: sendRequest },
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
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when deleting a user fails',
    () => {
      nock('http://localhost')
      .delete('/api/user/tomipaul')
      .reply(400, {
        message: 'User could not be deleted'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'User could not be deleted'
          }
        }
      ];
      const store = mockStore({
        auth: { user }
      });
      return store.dispatch(actions
      .deleteUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
