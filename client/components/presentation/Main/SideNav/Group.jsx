import React from 'react';
import PropTypes from 'prop-types';

const Group = ({ groupName, unreadCount, onClick }) => {
  let unreadCountBadge = null;
  if (unreadCount > 0) {
    unreadCountBadge = <span className="badge">{unreadCount}</span>;
  }
  return (
    <li>
      <a
        className="waves-effect"
        href="#!"
        onClick={onClick}
      >{groupName}{unreadCountBadge}
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
