import { actions as notifActions } from 'redux-notifications';

const { notifSend } = notifActions;

/**
 * async helper function: show error notification
 * @function showErrorNotification
 * @param {object} error
 * @returns {function} asynchronous action
 */
export function showErrorNotification({ message, error }) {
  return (dispatch) => {
    dispatch(notifSend({
      message: message || error.response.data.error,
      kind: 'danger',
      dismissAfter: 5000
    }));
  };
}

/**
 * async helper function: show success notification
 * @function showSuccessrNotification
 * @param {string} message
 * @param {object} response
 * @returns {function} asynchronous action
 */
export function showSuccessNotification({ message, response }) {
  return (dispatch) => {
    dispatch(notifSend({
      message: message || response.data.message,
      kind: 'success',
      dismissAfter: 5000
    }));
  };
}

/**
 * async helper function: show info notification
 * @function showInfoNotification
 * @param {string} message
 * @returns {function} asynchronous action
 */
export function showInfoNotification({ message }) {
  return (dispatch) => {
    dispatch(notifSend({
      message,
      kind: 'info',
      dismissAfter: 15000
    }));
  };
}
