import React from 'react';
import PropTypes from 'prop-types';
import GroupNameDescription from './GroupNameDescription';
import GroupOptions from './GroupOptions';
import GroupOptionsDisplayToggle from './GroupOptionsDisplayToggle';

/**
 * GroupHeader component
 * @param {object} props
 * @param {string} props.name name of the active group
 * @param {string} props.description  description of the active group
 * @param {function} props.showSearchUserView show the searchbox
 * where users can be searched
 * @param {function} props.showGroupMemberView show the view that
 * displays all members of the active group
 * @return {object} GroupHeader component
 */
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
