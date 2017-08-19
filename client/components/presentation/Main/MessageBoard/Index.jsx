import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from './MessageBox.jsx';

const MessageBoard = ({ messages }) =>
  (
    <div className="message-board">
      {
        messages.map((message) => {
          const { id, ...messageWithoutId } = message;
          return (
            <MessageBox
              key={id}
              message={messageWithoutId}
            />
          );
        })
      }
    </div>
  );

MessageBoard.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired
  }).isRequired).isRequired
};

export default MessageBoard;
