import React from 'react';
import PropTypes from 'prop-types';

/**
 * Submit button to post a message
 * @param {object} props
 * @param {function} props.onClick
 * @returns {object} SubmitButton component
 */
const SubmitButton = ({ onClick }) =>
  (
    <div className="col s1 send-button">
      <i
        className="material-icons"
        onClick={onClick}
        role="button"
        tabIndex="-1"
      >send</i>
    </div>
  );

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SubmitButton;
