import { LOG_ERROR, CLEAR_ERROR } from '../actions/actionTypes/error';

const logError = (state = [], action) => {
  if (action.type === LOG_ERROR) {
    return [
      action.error.error
    ];
  } else if (action.type === CLEAR_ERROR) {
    return [];
  }
  return state;
};

export default logError;
