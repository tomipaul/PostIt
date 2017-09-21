import React from 'react';
import PropTypes from 'prop-types';

/**
 * Group component; display a group
 * @function Group
 * @param {object} props
 * @param {string} props.groupName name of a group
 * @param {number} props.unreadCount number of unread messages in group
 * @param {function} props.onClick function that is called when
 * a group is clicked
 * @returns {object} Group component
 */
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
