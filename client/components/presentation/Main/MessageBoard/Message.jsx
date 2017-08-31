import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

/* eslint-disable */
const Message = ({ Author, priority, text, createdAt }) => {
  const matched = text.split(/<\/?p>/);
  return (
    <div className="message-text">
      <a href=""><span className="author-name">{Author}</span></a>
      <span className="created-at">{createdAt}</span>
      <div className="priority-tag">
        <span>{priority}</span>
        <i className="fa fa-tags" aria-hidden="true" />
        <i
          className="fa fa-check-circle"
          data-tip="@tomipaul @emeka @ayodele @tomipaul @emeka @ayodele"
          data-for="users-tooltip"
          data-place="top"
          data-class="extra"
          data-delay-hide="0"
        />
        <ReactTooltip id="users-tooltip" type="dark" effect="float">
          {"@tomipaul @emeka @ayodele @tomipaul @emeka @ayodele"}
        </ReactTooltip>
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
