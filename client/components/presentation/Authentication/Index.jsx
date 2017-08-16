import React from 'react';
import PropTypes from 'prop-types';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import initilaizeAuthComponents from '../../../bin/js/signup-login';

const Authentication = ({ onSignUpSubmit, onSignInSubmit }) => {
  initilaizeAuthComponents();
  return (
    <div className="form-div">
      <SignIn
        onSubmit={onSignInSubmit}
      />
      <SignUp
        onSubmit={onSignUpSubmit}
      />
    </div>
  );
};

Authentication.propTypes = {
  onSignInSubmit: PropTypes.func.isRequired,
  onSignUpSubmit: PropTypes.func.isRequired
};

export default Authentication;
