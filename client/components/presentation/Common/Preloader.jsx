import React from 'react';
import PropTypes from 'prop-types';

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
