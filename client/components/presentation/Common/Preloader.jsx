import React from 'react';
import PropTypes from 'prop-types';

/**
 * Preloader component displayed when an ajax
 * request is in progress
 * @function Preloader
 * @param {object} props
 * @param {number} props.requestCount number of requests that are
 * in progress
 * @param {string} props.id id of preloader
 * @returns {object} Preloader component
 */
const Preloader = ({ requestCount, id }) =>
  (
    (requestCount > 0) ? (
      <div
        id={id}
        className="progress"
      >
        <div className="indeterminate" />
      </div>
    ) : null
  );

Preloader.propTypes = {
  id: PropTypes.string.isRequired,
  requestCount: PropTypes.number.isRequired
};

export default Preloader;
