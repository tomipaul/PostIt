import reducer from '../../reducers/selectedUser';
import * as types from '../../actions/actionTypes/User';
import { selectedUser } from '../__mocks__/dummyData';

describe('selectedUser reducer', () => {
  it(`should return the initial state when passed an 
  undefined state and empty action`, () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it(`should handle SELECT_USER action by setting 
  the state to the selected user`, () => {
    expect(
      reducer({}, {
        type: types.SELECT_USER,
        user: selectedUser
      })
    ).toEqual(selectedUser);
  });
  it(`should handle CLEAR_SELECTED_USER action 
  by clearing the state`, () => {
    expect(
      reducer(selectedUser, {
        type: types.CLEAR_SELECTED_USER,
      })
    ).toEqual({});
  });
  it(`should handle GET_USER_SUCCESS action by setting 
  the state to the fetched user`, () => {
    expect(
      reducer({}, {
        type: types.GET_USER_SUCCESS,
        response: { user: selectedUser }
      })
    ).toEqual(selectedUser);
  });
  it(`should handle UPDATE_USER_SUCCESS action by 
  setting the state to the updated user object`, () => {
    expect(
      reducer({ username: selectedUser.username }, {
        type: types.UPDATE_USER_SUCCESS,
        response: { user: selectedUser }
      })
    ).toEqual(selectedUser);
  });
});
