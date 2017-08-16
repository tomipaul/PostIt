import sendRequest from '../../actions/actionCreators/requestAction';
import SEND_REQUEST from '../../actions/actionTypes/request';

describe('request action', () => {
  describe('action sendRequest', () => {
    it('should create an action when a network request is sent', () => {
      const expectedAction = {
        type: SEND_REQUEST
      };
      expect(sendRequest()).toEqual(expectedAction);
    });
  });
});
