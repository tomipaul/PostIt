import React from 'react';
import PropTypes from 'prop-types';

const ErrorDialog = ({ error, clearError }) =>
  (
    (error) ? (
      <div className="error-dialog">
        <i
          className="fa fa-times-circle"
          role="button"
          tabIndex="0"
          onClick={clearError}
        />
        <span>
          <i className="fa fa-exclamation-triangle" /> {error}
        </span>
      </div>
    ) : null
  );

ErrorDialog.propTypes = {
  error: PropTypes.string,
  clearError: PropTypes.func.isRequired
};
ErrorDialog.defaultProps = {
  error: null
};

export default ErrorDialog;
