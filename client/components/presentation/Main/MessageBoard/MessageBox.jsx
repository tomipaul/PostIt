import React from 'react';
import PropTypes from 'prop-types';
import AuthorImage from './AuthorImage.jsx';
import Message from './Message.jsx';

const MessageBox = ({ message }) => {
  const { Author, AuthorUsername, priority, text } = message;
  return (
    <div
      className="message-box z-depth-1 col s12 m9"
      data-priority={priority}
    >
      <AuthorImage AuthorImageLink={Author.photoURL} />
      <Message
        Author={AuthorUsername}
        priority={priority}
        text={text}
      />
    </div>
  );
};

MessageBox.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    AuthorUsername: PropTypes.string.isRequired,
    AuthorImageLink: PropTypes.string
  }).isRequired
};

export default MessageBox;
