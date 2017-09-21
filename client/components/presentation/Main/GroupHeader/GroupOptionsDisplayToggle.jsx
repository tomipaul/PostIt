import React from 'react';
import ReactTooltip from 'react-tooltip';

/**
 * a button that displays a dropdown menu when clicked
 * @function GroupOptionsDisplayToggle
 * @returns {object} component
 */
const GroupOptionsDisplayToggle = () => {
  $('.dropdown-button').dropdown({
    constrainWidth: false
  });
  return (
    <div className="menu col s3">
      <a
        className="dropdown-button"
        href="#!"
        data-for="group-options"
        data-tip="Group Options"
        data-activates="dropdown1"
      ><i className="fa fa-caret-down fa-2x" aria-hidden="true" />
      </a>
      <ReactTooltip id="group-options" place="left" type="dark" effect="float" />
    </div>
  );
};

export default GroupOptionsDisplayToggle;
