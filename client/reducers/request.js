import SEND_REQUEST from '../actions/actionTypes/request';

const requestCount = (state = 0, action) => {
  if (action.type === SEND_REQUEST) {
    return state + 1;
  } else if (action.type.includes('SUCCESS') ||
  action.type.includes('ERROR')) {
    return state - 1;
  }
  return state;
};

export default requestCount;
