import reducer from '../../reducers/userGroups';
import {
  FETCH_USER_GROUPS_SUCCESS
} from '../../actions/actionTypes/User';
import {
  CREATE_GROUP_SUCCESS
} from '../../actions/actionTypes/Group';

const groups = [
  {
    id: 1,
    name: 'First group',
    description: 'The first group'
  },
  {
    id: 2,
    name: 'Second Group',
    description: 'The second group'
  }
];
describe('userGroups reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      groups: {},
      groupsById: []
    });
  });
  it('should handle FETCH_USER_GROUPS_SUCCESS', () => {
    expect(
      reducer({ groups: {}, groupsById: [] }, {
        type: FETCH_USER_GROUPS_SUCCESS,
        response: { groups }
      })
    ).toEqual({
      groups: {
        [groups[0].id]: groups[0],
        [groups[1].id]: groups[1]
      },
      groupsById: [1, 2]
    });
  });
  it('should handle CREATE_GROUP_SUCCESS', () => {
    expect(
      reducer({ groups: {}, groupsById: [] }, {
        type: CREATE_GROUP_SUCCESS,
        response: { group: groups[0] }
      })
    ).toEqual({
      groups: {
        [groups[0].id]: groups[0],
      },
      groupsById: [1]
    });
  });
});
