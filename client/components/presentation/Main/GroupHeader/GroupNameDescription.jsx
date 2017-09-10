import React from 'react';
import PropTypes from 'prop-types';

/**
 * GroupNameDescription component; display group name and description
 * @function GroupNameDescription
 * @param {object} props
 * @param {string} props.name name of the active group
 * @param {string} props.description description of the active group
 * @returns {object} GroupNameDescription component
 */
const GroupNameDescription = ({ name, description }) =>
  (
    <div className="group-name col s9">
      <span>{name}</span> |
      <span id="description">{description}</span>
    </div>
  );

GroupNameDescription.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default GroupNameDescription;
