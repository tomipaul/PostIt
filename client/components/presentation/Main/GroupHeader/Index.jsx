import React from 'react';
import PropTypes from 'prop-types';
import GroupNameDescription from './GroupNameDescription.jsx';
import GroupOptions from './GroupOptions.jsx';
import GroupOptionsDisplayToggle from './GroupOptionsDisplayToggle.jsx';

const GroupHeader = ({
  name,
  description,
  showSearchUserView,
  showGroupMemberView
}) =>
  (
    <div className="group-board-header z-depth-2">
      <div className="group-header-flex row">
        <GroupNameDescription
          name={name}
          description={description}
        />
        {
          (name) ?
          (
            <GroupOptionsDisplayToggle />
          )
          : null
        }
        <GroupOptions
          showSearchUserView={showSearchUserView}
          showGroupMemberView={showGroupMemberView}
        />
      </div>
    </div>
  );

GroupHeader.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  showSearchUserView: PropTypes.func.isRequired,
  showGroupMemberView: PropTypes.func.isRequired
};

export default GroupHeader;
