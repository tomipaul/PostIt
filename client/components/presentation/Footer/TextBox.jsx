import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({
  message,
  messageWasChanged,
  onSubmitMessage
}) => {
  return (
    <textarea
      className="write-message col s9"
      value={message}
      onChange={messageWasChanged}
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
};

TextBox.propTypes = {
  message: PropTypes.string.isRequired,
  messageWasChanged: PropTypes.func.isRequired,
  onSubmitMessage: PropTypes.func.isRequired
};

export default TextBox;
