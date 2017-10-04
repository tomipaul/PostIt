import React from 'react';
import PropTypes from 'prop-types';

/**
 * GroupOptions component that displays functions
 * that can be performed in the group
 * @function GroupOptions
 * @param {object} props
 * @param {function} props.showSearchUserView show the searchbox
 * where users can be searched
 * @param {function} props.showGroupMemberView show the view that
 * displays all members of the active group
 * @returns {object} GroupOptions component
 */
const GroupOptions = ({ showSearchUserView, showGroupMemberView }) =>
  (
    <ul id="dropdown1" className="dropdown-content">
      <li>
        <a
          href="#!"
          onClick={showSearchUserView}
        ><i className="material-icons">library_add</i>Add User</a>
      </li>
      <li>
        <a
          href="#!"
          onClick={showGroupMemberView}
        ><i className="material-icons">group</i>Member List</a>
      </li>
      <li className="divider" />
    </ul>
  );

GroupOptions.propTypes = {
  showSearchUserView: PropTypes.func.isRequired,
  showGroupMemberView: PropTypes.func.isRequired
};

export default GroupOptions;
