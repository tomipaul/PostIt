import reducer from '../../reducers/activeGroup';
import { SELECT_GROUP } from '../../actions/actionTypes/Group';

describe('activeGroup reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });
  it('should handle SELECT_GROUP', () => {
    expect(
      reducer([], {
        type: SELECT_GROUP,
        groupId: '23'
      })
    ).toEqual('23');
  });
});

