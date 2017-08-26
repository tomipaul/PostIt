import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { actions as notifActions } from 'redux-notifications';

const { notifDismiss } = notifActions;

const Dialog = ({ dispatch, id, kind, message }) => {
  const dialogClass = classnames({
    'error-dialog': true,
    'z-depth-2': true,
    'notif--success': kind === 'success',
    'notif--info': kind === 'info',
    'notif--warning': kind === 'warning',
    'notif--danger': kind === 'danger'
  });

  return (message) ?
  (
    <div className={dialogClass}>
      <i
        className="fa fa-times-circle"
        role="button"
        tabIndex="0"
        onClick={() => {
          dispatch(notifDismiss(id));
        }}
      />
      <span className="kind-icon">
        <i
          className={
            classnames({
              'fa fa-exclamation-triangle': kind === 'warning'
              || kind === 'danger',
              'fa fa-check-circle': kind === 'success',
              'fa fa-info-circle': kind === 'info'
            })
          }
        /> {message}
      </span>
    </div>
  ) : null;
};


Dialog.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string,
  kind: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};
Dialog.defaultProps = {
  message: null
};

export default Dialog;
