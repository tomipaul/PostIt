import React from 'react';
import PropTypes from 'prop-types';

const GroupOptions = ({ showSearchUserView, showGroupMemberView }) => {
  return (
    <ul id="dropdown1" className="dropdown-content">
      <li>
        <a
          href="#!"
          onClick={showSearchUserView}
        ><i className="material-icons">library_add</i>Add User</a>
      </li>
      <li>
        <a href="#!"><i className="material-icons">delete</i>Delete Group</a>
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
};

GroupOptions.propTypes = {
  showSearchUserView: PropTypes.func.isRequired,
  showGroupMemberView: PropTypes.func.isRequired
};

export default GroupOptions;
