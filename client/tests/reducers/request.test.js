import reducer from '../../reducers/request';
import SEND_REQUEST from '../../actions/actionTypes/request';

describe('requestCount reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(0);
  });
  it('should handle SEND_REQUEST', () => {
    expect(
      reducer(0, {
        type: SEND_REQUEST,
      })
    ).toEqual(1);
  });
});

