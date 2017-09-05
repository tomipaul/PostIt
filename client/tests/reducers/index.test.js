import reducer from '../../reducers/index';
import { LOG_OUT_SUCCESS } from '../../actions/actionTypes/User';


describe('combined reducer', () => {
  it('should handle LOG_OUT_SUCCESS', () => {
    expect(
      reducer({}, {
        type: LOG_OUT_SUCCESS,
      })
    ).toEqual({
      activeGroup: null,
      activeGroupMessages: [],
      activeGroupUsers: [],
      auth: {
        isAuthenticated: false,
        user: {
          photoURL: '/images/silhouette.jpeg'
        }
      },
      logError: [],
      notifs: [],
      requestCount: -1,
      selectedUser: {},
      unreadMessages: {},
      userGroups: { groups: {}, groupsById: [] },
      users: []
    });
  });
});

