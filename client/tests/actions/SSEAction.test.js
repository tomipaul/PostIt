import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import eventSourceMock, { sources } from 'eventsourcemock';
import * as actions from '../../actions/actionCreators/SSEAction';
import SUBSCRIBE_TO_MESSAGES_SUCCESS from '../../actions/actionTypes/sse';
import * as userActions from '../../actions/actionTypes/User';
import * as groupActions from '../../actions/actionTypes/Group';
import { sendRequest, notifSend } from '../__mocks__/commonActions';
import localStorageMock from '../__mocks__/localStorage';
import { state, savedMessage } from '../__mocks__/dummyData';

window.EventSource = eventSourceMock;
window.localStorage = localStorageMock;
window.setInterval = jest.fn();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SSE synchronous actions', () => {
  describe('action subscribeToMessagesSuccess', () => {
    it('should create an action to subscribe to messages', () => {
      const expectedAction = {
        type: SUBSCRIBE_TO_MESSAGES_SUCCESS
      };
      expect(actions.subscribeToMessagesSuccess()).toEqual(expectedAction);
    });
  });
});

describe('sse async action', () => {
  describe('async action subscribeToMessages', () => {
    it(`dispatches SEND_REQUEST action when a connection 
    is initialised`, () => {
      const expectedAction = [sendRequest];
      const store = mockStore(state);
      store.dispatch(actions
      .subscribeToMessages());
      expect(store.getActions()).toEqual(expectedAction);
    });

    it(`dispatches SUBSCRIBE_TO_MESSAGES_SUCCESS action when 
    connection is successfully open`, () => {
      const expectedAction = [
        sendRequest,
        {
          type: SUBSCRIBE_TO_MESSAGES_SUCCESS
        }
      ];
      const store = mockStore(state);
      store.dispatch(actions
      .subscribeToMessages());
      // eslint-disable-next-line
      const openEvent = new MessageEvent('open');
      const connectionInstance = Object.keys(sources)[0];
      sources[connectionInstance].emit(
        openEvent.type,
        openEvent
      );
      expect(store.getActions()).toEqual(expectedAction);
    });

    it(`dispatches actions when message event is received, 
    user is a member of the group to which the message is posted 
    and the group is the active group`, () => {
      nock('http://localhost')
      .post('/api/v0/group/first/messages/read')
      .reply(200);
      const expectedAction = [
        sendRequest,
        {
          type: groupActions.ADD_MESSAGE_TO_GROUP_SUCCESS,
          response: {
            createdMessage: savedMessage
          }
        },
        {
          type: userActions.ADD_TO_UNREAD_MESSAGES,
          groupId: savedMessage.GroupId,
          messageId: savedMessage.id
        },
        notifSend('info', 'alienyi01 posted a message to group23')
      ];
      const store = mockStore(state);
      store.dispatch(actions
      .subscribeToMessages());
      // eslint-disable-next-line
      const messageEvent = new MessageEvent('message', {
        data: JSON.stringify(savedMessage)
      });
      const connectionInstance = Object.keys(sources)[0];
      sources[connectionInstance].emit(
        messageEvent.type,
        messageEvent
      );
      expect(store.getActions()).toMatchObject(expectedAction);
    });
  });
});
