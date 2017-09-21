import React from 'react';
import PropTypes from 'prop-types';
import SignIn from './SignIn';
import SignUp from './SignUp';

/**
 * Authentication component
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
      userAccess: true,
    };
    this.toggleForm = this.toggleForm.bind(this);
  }
  /**
   * Toggle display of signup and signin forms
   * @method toggleForm
   * @memberof Authentication
   * @returns {void}
   */
  toggleForm() {
    this.setState({
      userAccess: !this.state.userAccess
    });
  }

  /**
   * display authentication form
   * @method render
   * @returns {object} authentication component
   */
  render() {
    const { signInUser, signUpUser } = this.props;
    return (
      <div className="form-div">
        {
          // eslint-disable-next-line
          this.state.userAccess ?
          (
            <SignIn
              onSubmit={signInUser}
              showSignup={this.toggleForm}
            />
          ) :
          (
            <SignUp
              onSubmit={signUpUser}
              showLogin={this.toggleForm}
            />
          )
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
