import React from 'react';
import PropTypes from 'prop-types';
import AuthorImage from './AuthorImage.jsx';
import Message from './Message.jsx';

/**
 * @function convertDateTimeString
 * @param {string} date
 * @return {string} date localestring or time difference
 * between date and current date
 */
const convertDateTimeString = (date) => {
  let dateString = new Date(date).toLocaleString();
  const timeDiff = Date.now() - Date.parse(dateString);
  if (timeDiff < 3600000) {
    const minutes = Math.floor(timeDiff / 60000);
    dateString = `${minutes} ${(minutes > 1) ? 'mins' : 'min'}`;
    return dateString;
  } else if (timeDiff < 86400000) {
    const hours = Math.floor(timeDiff / 3600000);
    dateString = `${hours} ${(hours > 1) ? 'hours' : 'hour'}`;
    return dateString;
  }
  return dateString;
};

/**
 * @function MessageBox
 * @param {object.<object>} message
 * @returns {object} component
 */
const MessageBox = ({ message }) => {
  const {
    Author,
    AuthorUsername,
    priority,
    text,
    createdAt
  } = message;
  return (
    <div
      className="message-box z-depth-1 col s12 m9"
      data-priority={priority}
    >
      <AuthorImage AuthorImageLink={Author.photoURL ||
      '/images/silhouette.jpeg'}
      />
      <Message
        Author={AuthorUsername}
        priority={priority}
        text={text}
        createdAt={convertDateTimeString(createdAt)}
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
