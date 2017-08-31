import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from './MessageBox.jsx';

const MessageBoard = ({ messages, onScroll }) =>
  (
    <div
      className="message-board"
      onScroll={onScroll}
    >
      <span className="see-older">
        <hr />
        SEE OLDER MESSAGES
        <hr />
      </span>
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
  }).isRequired).isRequired,
  onScroll: PropTypes.func.isRequired
};

export default MessageBoard;
