import React from 'react';
import PropTypes from 'prop-types';

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
