import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../actions/actionCreators/GroupActions';
import * as groupActionTypes from '../../actions/actionTypes/Group';
import { sendRequest, notifSend } from '../__mocks__/commonActions';
import localStorageMock from '../__mocks__/localStorage';
import { group, user, message } from '../__mocks__/dummyData';
import {
  group,
  user,
  message,
  usersThatHaveReadMessage
} from '../__mocks__/dummyData';

window.localStorage = localStorageMock;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
        sendRequest,
        {
          type: groupActionTypes.CREATE_GROUP_SUCCESS,
          response: {
            group
          }
        },
        notifSend('success')
      ];
      const store = mockStore({});
      return store.dispatch(actions
      .createGroup(name, description))
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched.slice(0, 2))
        .toEqual(expectedActions.slice(0, 2));
        expect(dispatched.slice(-1))
        .toMatchObject(expectedActions.slice(-1));
      });
    });

    it('creates NOTIF_SEND when group creation fails',
    () => {
      const { name, description } = group;
      nock('http://localhost')
      .post('/api/group')
      .reply(400, {
        error: 'Invalid Group name'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'Invalid Group name')
      ];
      const store = mockStore({});
      return store.dispatch(actions
      .createGroup(name, description))
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched).toMatchObject(expectedActions);
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
        sendRequest,
        {
          type: groupActionTypes.ADD_USER_TO_GROUP_SUCCESS,
          response: {
            group
          }
        },
        notifSend('success')
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .addUserToGroup(user.username))
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIF_SEND when adding a user to a group fails',
    () => {
      nock('http://localhost')
      .post('/api/group/23/user')
      .reply(400, {
        error: 'User cannot be added to group'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'User cannot be added to group')
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .addUserToGroup(user.username))
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action addMessageToGroup', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it(`does not create ADD_MESSAGE_TO_GROUP_SUCCESS 
    when message is added to group`, () => {
      nock('http://localhost')
      .post('/api/group/23/message')
      .reply(200, {
        createdMessage: message
      });
      const expectedActions = [
        sendRequest,
        notifSend('success')
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .addMessageToGroup(message))
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIF_SEND when adding a message to a group fails',
    () => {
      nock('http://localhost')
      .post('/api/group/23/message')
      .reply(400, {
        error: 'Message cannot be added to group'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'Message cannot be added to group')
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .addMessageToGroup(user.username))
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action removeUserFromGroup', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it(`creates REMOVE_USER_FROM_GROUP_SUCCESS when 
    user is removed from group`, () => {
      nock('http://localhost')
      .delete('/api/group/23/user/tomipaul')
      .reply(200, {
        username: user.username
      });
      const expectedActions = [
        sendRequest,
        {
          type: groupActionTypes.REMOVE_USER_FROM_GROUP_SUCCESS,
          response: {
            username: user.username
          }
        },
        notifSend('success')
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .removeUserFromGroup(user.username))
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIF_SEND when removing a user from a group fails',
    () => {
      nock('http://localhost')
      .delete('/api/group/23/user/tomipaul')
      .reply(400, {
        error: 'User cannot be removed from group'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'User cannot be removed from group')
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .removeUserFromGroup(user.username))
      .then(() => {
        const dispatched = store.getActions().slice(0, 2);
        expect(dispatched).toMatchObject(expectedActions);
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
        sendRequest,
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
        const dispatched = store.getActions();
        expect(dispatched).toEqual(expectedActions);
      });
    });

    it('creates NOTIF_SEND when fetching group users fail',
    () => {
      nock('http://localhost')
      .get('/api/group/23/users')
      .reply(500, {
        error: 'Cannot get group users'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'Cannot get group users')
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .getGroupUsers())
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action getGroupMessages', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it(`creates GET_GROUP_MESSAGES_SUCCESS when messages
    of a group are fetched`, () => {
      nock('http://localhost')
      .get('/api/group/23/messages')
      .reply(200, {
        messages: [message]
      });
      const expectedActions = [
        sendRequest,
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
        const dispatched = store.getActions();
        expect(dispatched).toEqual(expectedActions);
      });
    });

    it('creates NOTIF_SEND when fetching group messages fail',
    () => {
      nock('http://localhost')
      .get('/api/group/23/messages')
      .reply(500, {
        error: 'Cannot get group messages'
      });
      const expectedActions = [
        sendRequest,
        notifSend('danger', 'Cannot get group messages')
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .getGroupMessages())
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action readUnreadGroupMessages', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it(`creates GROUP_MESSAGES_READ when user reads 
    unread messages of a group`, () => {
      nock('http://localhost')
      .post('/api/group/23/messages/read')
      .reply(200);
      const expectedActions = [
        {
          type: groupActionTypes.GROUP_MESSAGES_READ,
          groupId: '23'
        }
      ];
      const store = mockStore({
        activeGroup: '23',
        unreadMessages: {
          23: ['2', '4', '6']
        }
      });
      return store.dispatch(actions
      .readUnreadGroupMessages())
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched).toMatchObject(expectedActions);
      });
    });

    it('creates NOTIF_SEND when reading group messages fail',
    () => {
      nock('http://localhost')
      .post('/api/group/23/messages/read')
      .reply(500);
      const expectedActions = [
        notifSend('danger', 'Request errored out, Please try again')
      ];
      const store = mockStore({
        activeGroup: '23',
        unreadMessages: {
          23: ['2', '4', '6']
        }
      });
      return store.dispatch(actions
      .readUnreadGroupMessages())
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched).toMatchObject(expectedActions);
      });
    });
  });

  describe('async action getUsersWithMessageRead', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it(`creates GET_USERS_WITH_MESSAGE_READ_SUCCESS when users 
    that have read a particular message are fetched`, () => {
      nock('http://localhost')
      .get('/api/group/23/message/23/users')
      .reply(200, {
        users: usersThatHaveReadMessage
      });
      const expectedActions = [
        {
          type: groupActionTypes.GET_USERS_WITH_MESSAGE_READ_SUCCESS,
          response: { users: usersThatHaveReadMessage },
          messageId: '23'
        }
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .getUsersWithMessageRead('23'))
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched).toMatchObject(expectedActions);
      });
    });

    it(`creates NOTIF_SEND when getting users that have read 
    a message fails`, () => {
      nock('http://localhost')
      .get('/api/group/23/message/23/users')
      .reply(500);
      const expectedActions = [
        notifSend('danger', 'Request failed, Please try again')
      ];
      const store = mockStore({ activeGroup: '23' });
      return store.dispatch(actions
      .getUsersWithMessageRead('23'))
      .then(() => {
        const dispatched = store.getActions();
        expect(dispatched).toMatchObject(expectedActions);
      });
    });
  });
});
