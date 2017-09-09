import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from './MessageBox';


/**
 * MessageBoard component; displays a message and its metadata
 * @function MessageBoard
 * @param {object} props
 * @param {array.object} messages array of message object
 * @param {function} onScroll handler for onScroll event on
 * the messageBoard root div element
 * @param {object} nodeRef reference to the messageBoard
 * root div element
 * @return {object} MessageBoard component
 */
const MessageBoard = ({
  messages,
  onScroll,
  nodeRef
}) =>
  (
    <div
      ref={nodeRef}
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
          const { id } = message;
          return (
            <MessageBox
              key={id}
              message={message}
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
  onScroll: PropTypes.func.isRequired,
  nodeRef: PropTypes.func.isRequired
};

export default MessageBoard;
