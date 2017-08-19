import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ Author, priority, text }) =>
  (
    <div className="message-text">
      <a href=""><span className="author-name">{Author}</span></a>
      <div className="priority-tag">
        <span>{priority}</span>
        <i className="fa fa-tags" aria-hidden="true" />
      </div>
      <div
        className="message"
      >{text}
      </div>
    </div>
  );

Message.propTypes = {
  text: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  Author: PropTypes.string.isRequired
};

export default Message;
