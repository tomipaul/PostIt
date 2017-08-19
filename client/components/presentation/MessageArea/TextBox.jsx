import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({
  message,
  changeMessage,
  onSubmitMessage
}) =>
  (
    <textarea
      className="write-message col s9"
      value={message}
      onChange={changeMessage}
      onKeyPress={(event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          onSubmitMessage();
        }
      }}
      rows="4"
      placeholder="Write a message. You can use markdown"
    />
  );

TextBox.propTypes = {
  message: PropTypes.string.isRequired,
  changeMessage: PropTypes.func.isRequired,
  onSubmitMessage: PropTypes.func.isRequired
};

export default TextBox;
