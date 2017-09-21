import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * component displayed when user navigates to a
 * route that does not exist
 * @function NotFound
 * @returns {object} NotFound component
 */
export const NotFound = ({ isAuthenticated }) => {
  const buttonText = (isAuthenticated) ?
  'Back to Dashboard' : 'Back to Homepage';
  const location = (isAuthenticated) ?
  '/dashboard' : '/';
  return (
    <div className="error-404">
      <a
        className="waves-effect waves-light btn"
        href={location}
      >{buttonText}</a>
    </div>
  );
};

NotFound.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(NotFound);
