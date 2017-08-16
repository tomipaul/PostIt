import React from 'react';
import PropTypes from 'prop-types';

const Group = ({ groupName, unreadCount, onClick }) => {
  let unreadCountLabel = null;
  if (unreadCount > 0) {
    unreadCountLabel = <span className="new badge">{unreadCount}</span>;
  }
  return (
    <li>
      <a
        className="waves-effect"
        href="#!"
        onClick={onClick}
      >{groupName}{unreadCountLabel}
      </a>
    </li>
  );
};

Group.propTypes = {
  groupName: PropTypes.string.isRequired,
  unreadCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Group;
