import SEND_REQUEST from '../../actions/actionTypes/request';

export const sendRequest = { type: SEND_REQUEST };
export const notifSend = (kind, message) =>
  ({
    type: 'NOTIF_SEND',
    payload: {
      message,
      kind,
      dismissAfter: (kind === 'info') ? 15000 : 5000
    }
  });
