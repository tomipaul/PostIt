import React from 'react';
import PropTypes from 'prop-types';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import initializeAuthComponents from '../../../bin/js/signup-login';

const Authentication = ({ signInUser, signUpUser }) => {
  initializeAuthComponents();
  return (
    <div className="form-div">
      <SignIn
        onSubmit={signInUser}
      />
      <SignUp
        onSubmit={signUpUser}
      />
    </div>
  );
};

Authentication.propTypes = {
  signInUser: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired
};

export default Authentication;
