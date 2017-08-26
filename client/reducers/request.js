import SEND_REQUEST from '../actions/actionTypes/request';

const requestCount = (state = 0, action) => {
  if (action.type === SEND_REQUEST) {
    return state + 1;
  }
  if (action.type.includes('SUCCESS')) {
    return state - 1;
  }
  if (action.type.includes('NOTIF')
  && action.payload.kind === 'danger') {
    return state - 1;
  }
  return state;
};

export default requestCount;
