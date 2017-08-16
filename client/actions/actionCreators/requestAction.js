import SEND_REQUEST from '../actionTypes/request';

/**
 * create action: request initiated or completed
 * @function logError
 * @param {object} error
 * @returns {object} action: type and error
 */
export default function sendRequest() {
  return {
    type: SEND_REQUEST
  };
}
