import React from 'react';
import PropTypes from 'prop-types';
import AuthorImage from './AuthorImage';
import Message from './Message';

/**
 * convert a datestring
 * @function convertDateTimeString
 * @param {string} date
 * @return {string} date localestring or time difference
 * between date and current date
 */
export const convertDateTimeString = (date) => {
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
 * component that displays message and messsage metadata
 * @function MessageBox
 * @param {object} props
 * @param {object.<object>} props.message
 * @returns {object} MessageBox component
 */
const MessageBox = ({ message }) => {
  const {
    id,
    Author,
    AuthorUsername,
    priority,
    text,
    createdAt,
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
        messageId={id}
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
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    AuthorUsername: PropTypes.string.isRequired,
    AuthorImageLink: PropTypes.string
  }).isRequired
};

export default MessageBox;
