import reducer from '../../reducers/logError';
import {
  LOG_ERROR,
  CLEAR_ERROR
} from '../../actions/actionTypes/error';

const error = 'This is an error';
describe('logError reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  it('should handle LOG_ERROR', () => {
    expect(
      reducer([], {
        type: LOG_ERROR,
        error: { error }
      })
    ).toEqual([error]);
  });
  it('should handle CLEAR_ERROR', () => {
    expect(
      reducer(['It should handle CLEAR_ERROR'], {
        type: CLEAR_ERROR
      })
    ).toEqual([]);
  });
});
