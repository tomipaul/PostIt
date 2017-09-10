import reducer from '../../reducers/users';
import {
  GET_ALL_USERS_SUCCESS
} from '../../actions/actionTypes/User';
import { allUsers } from '../__mocks__/dummyData';

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  it('should handle GET_ALL_USERS_SUCCESS', () => {
    expect(
      reducer([], {
        type: GET_ALL_USERS_SUCCESS,
        response: { allUsers }
      })
    ).toEqual({ allUsers });
  });
});
