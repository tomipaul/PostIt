import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../actions/actionCreators/GroupActions';
import * as groupActionTypes from '../../actions/actionTypes/Group';
import sendRequest from '../../actions/actionTypes/request';
import * as errorActionTypes from '../../actions/actionTypes/error';
import localStorageMock from '../__mocks__/localStorage';

window.localStorage = localStorageMock;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const group = {
  name: 'first_group',
  description: 'This is the first group'
};
const user = {
  username: 'tomipaul',
  email: 'tomi@paul.com',
  phoneNo: '353275632723',
  password: '123456',
  token: '12234432653553232'
};
const message = {
  text: 'This is a message',
  priority: 'urgent'
};

describe('Group synchronous actions', () => {
  describe('action selectGroup', () => {
    it('should create an action to select a group', () => {
      const groupId = '23';
      const expectedAction = {
        type: groupActionTypes.SELECT_GROUP,
        groupId
      };
      expect(actions.selectGroup(groupId)).toEqual(expectedAction);
    });
  });
});

describe('Group async actions', () => {
  describe('async action createGroup', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates CREATE_GROUP_SUCCESS when group creation is done',
    () => {
      const { name, description } = group;
      nock('http://localhost')
      .post('/api/group')
      .reply(200, {
        group
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: groupActionTypes.CREATE_GROUP_SUCCESS,
          response: {
            group
          }
        }
      ];
      const store = mockStore({});
      return store.dispatch(actions
      .createGroup(name, description))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when group creation fails',
    () => {
      const { name, description } = group;
      nock('http://localhost')
      .post('/api/group')
      .reply(400, {
        message: 'Invalid Group name'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'Invalid Group name'
          }
        }
      ];
      const store = mockStore({});
      return store.dispatch(actions
      .createGroup(name, description))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('async action addUserToGroup', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates ADD_USER_TO_GROUP_SUCCESS when user is added to group',
    () => {
      nock('http://localhost')
      .post('/api/group/23/user')
      .reply(200, {
        group
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: groupActionTypes.ADD_USER_TO_GROUP_SUCCESS,
          response: {
            group
          }
        }
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .addUserToGroup(user.username))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when adding a user to a group fails',
    () => {
      nock('http://localhost')
      .post('/api/group/23/user')
      .reply(400, {
        message: 'User cannot be added to group'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'User cannot be added to group'
          }
        }
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .addUserToGroup(user.username))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('async action addMessageToGroup', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates ADD_MESSAGE_TO_GROUP_SUCCESS when message is posted to group',
    () => {
      nock('http://localhost')
      .post('/api/group/23/message')
      .reply(200, {
        createdMessage: message
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: groupActionTypes.ADD_MESSAGE_TO_GROUP_SUCCESS,
          response: {
            createdMessage: message
          }
        }
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .addMessageToGroup(message))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when posting a message to a group fails',
    () => {
      nock('http://localhost')
      .post('/api/group/23/message')
      .reply(400, {
        message: 'Message cannot be posted to group'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'Message cannot be posted to group'
          }
        }
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .addMessageToGroup(user.username))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('async action removeUserFromGroup', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates REMOVE_USER_FROM_GROUP_SUCCESS when user is removed from group',
    () => {
      nock('http://localhost')
      .delete('/api/group/23/user/tomipaul')
      .reply(200, {
        username: user.username
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: groupActionTypes.REMOVE_USER_FROM_GROUP_SUCCESS,
          response: {
            username: user.username
          }
        }
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .removeUserFromGroup(user.username))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when removing a user from a group fails',
    () => {
      nock('http://localhost')
      .delete('/api/group/23/user/tomipaul')
      .reply(400, {
        message: 'User cannot be removed from group'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'User cannot be removed from group'
          }
        }
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .removeUserFromGroup(user.username))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('async action getGroupUsers', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates GET_GROUP_USERS_SUCCESS when users of a group are fetched',
    () => {
      nock('http://localhost')
      .get('/api/group/23/users')
      .reply(200, {
        users: [user]
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: groupActionTypes.GET_GROUP_USERS_SUCCESS,
          response: {
            users: [user]
          }
        }
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .getGroupUsers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when fetching group users fail',
    () => {
      nock('http://localhost')
      .get('/api/group/23/users')
      .reply(400, {
        message: 'Cannot get group users'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'Cannot get group users'
          }
        }
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .getGroupUsers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('async action getGroupMessages', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('creates GET_GROUP_MESSAGES_SUCCESS when messages of a group are fetched',
    () => {
      nock('http://localhost')
      .get('/api/group/23/messages')
      .reply(200, {
        messages: [message]
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: groupActionTypes.GET_GROUP_MESSAGES_SUCCESS,
          response: {
            messages: [message]
          }
        }
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .getGroupMessages())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates LOG_ERROR when fetching group users fail',
    () => {
      nock('http://localhost')
      .get('/api/group/23/messages')
      .reply(400, {
        message: 'Cannot get group messages'
      });
      const expectedActions = [
        { type: sendRequest },
        {
          type: errorActionTypes.LOG_ERROR,
          error: {
            message: 'Cannot get group messages'
          }
        }
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .getGroupMessages())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
