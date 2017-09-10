import React from 'react';

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
        data-activates="dropdown1"
      ><i className="fa fa-ellipsis-h" aria-hidden="true" />
      </a>
    </div>
  );
};

export default GroupOptionsDisplayToggle;
