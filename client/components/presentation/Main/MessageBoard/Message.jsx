import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
const Message = ({ Author, priority, text }) => {
  const matched = text.split(/<\/?p>/);
  return (
    <div className="message-text">
      <a href=""><span className="author-name">{Author}</span></a>
      <div className="priority-tag">
        <span>{priority}</span>
        <i className="fa fa-tags" aria-hidden="true" />
      </div>
      {
        (matched.length > 1) ?
        (
          <div
            dangerouslySetInnerHTML={{ __html: matched[1]}}
            className="message"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: matched[0]}}
            className="message"
          />
        )
      }
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  Author: PropTypes.string.isRequired
};

export default Message;
