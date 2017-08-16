import * as actions from '../../actions/actionCreators/errorAction';
import * as errorActionTypes from '../../actions/actionTypes/error';

describe('error actions', () => {
  describe('action logError', () => {
    it('should create an action to log an error', () => {
      const error = {
        id: 2002,
        message: 'unknown error'
      };
      const expectedAction = {
        type: errorActionTypes.LOG_ERROR,
        error
      };
      expect(actions.logError(error)).toEqual(expectedAction);
    });
  });

  describe('action clearError', () => {
    it('should create an action to clear an error', () => {
      const expectedAction = {
        type: errorActionTypes.CLEAR_ERROR,
      };
      expect(actions.clearError()).toEqual(expectedAction);
    });
  });
});
