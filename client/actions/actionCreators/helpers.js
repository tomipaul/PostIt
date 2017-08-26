import { actions as notifActions } from 'redux-notifications';

const { notifSend } = notifActions;

/**
 * async helper function: show error notification
 * @function showErrorNotification
 * @param {object} error
 * @returns {function} asynchronous action
 */
export function showErrorNotification(error) {
  return (dispatch) => {
    dispatch(notifSend({
      message: error.response.data.error,
      kind: 'danger',
      dismissAfter: 5000
    }));
  };
}

/**
 * async helper function: show success notification
 * @function showErrorNotification
 * @param {string} message
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
