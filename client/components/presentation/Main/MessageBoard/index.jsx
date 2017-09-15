import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
  nodeRef,
  hasGroups
}) => {
  const messageBoardClasses = classNames({
    'message-board': true,
    'no-group': !hasGroups
  });
  return (
    <div
      ref={nodeRef}
      className={messageBoardClasses}
      onScroll={onScroll}
    >
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
};

MessageBoard.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onScroll: PropTypes.func.isRequired,
  nodeRef: PropTypes.func.isRequired,
  hasGroups: PropTypes.bool.isRequired
};

export default MessageBoard;
