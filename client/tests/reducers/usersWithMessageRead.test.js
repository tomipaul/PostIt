import reducer from '../../reducers/usersWithMessageRead';
import {
  GET_USERS_WITH_MESSAGE_READ_SUCCESS
} from '../../actions/actionTypes/Group';
import { usersThatHaveReadMessage as users } from '../__mocks__/dummyData';

describe('usersWithMessageRead reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('should handle GET_USERS_WITH_MESSAGE_READ_SUCCESS', () => {
    expect(
      reducer({}, {
        type: GET_USERS_WITH_MESSAGE_READ_SUCCESS,
        messageId: '2',
        response: { users }
      })
    ).toEqual({
      2: ['tomipaul', 'alienyi01']
    });
  });
});
