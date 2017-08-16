import { LOG_ERROR, CLEAR_ERROR } from '../actionTypes/error';

/**
 * create action: save and show error message on failure of any request
 * @function logError
 * @param {object} error
 * @returns {object} action: type and error
 */
export function logError(error) {
  return {
    type: LOG_ERROR,
    error
  };
}
/**
 * create action: clear error
 * @function logError
 * @param {object} error
 * @returns {object} action: type
 */
export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}
