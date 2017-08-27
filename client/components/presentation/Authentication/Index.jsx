import React from 'react';
import PropTypes from 'prop-types';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

/**
 * @class
 * @extends React.Component
 */
class Authentication extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      showLogin: true,
      showSignup: false
    };
    this.showLogin = this.showLogin.bind(this);
    this.showSignup = this.showSignup.bind(this);
  }
  /**
   * @method showLogin
   * @memberof Authentication
   * @returns {void}
   */
  showLogin() {
    this.setState({
      showLogin: true,
      showSignup: false
    });
  }
  /**
   * @method showSignup
   * @memberof Authentication
   * @returns {void}
   */
  showSignup() {
    this.setState({
      showLogin: false,
      showSignup: true
    });
  }
  /**
   * @method render
   * @returns {object} authentication component
   */
  render() {
    const { signInUser, signUpUser } = this.props;
    return (
      <div className="form-div">
        {
          // eslint-disable-next-line
          this.state.showLogin ?
          (
            <SignIn
              onSubmit={signInUser}
              showSignup={this.showSignup}
            />
          ) : this.state.showSignup ?
          (
            <SignUp
              onSubmit={signUpUser}
              showLogin={this.showLogin}
            />
          ) : null
        }
      </div>
    );
  }
}

Authentication.propTypes = {
  signInUser: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired
};

export default Authentication;
