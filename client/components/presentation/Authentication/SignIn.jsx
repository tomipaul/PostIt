import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class SignUp
 * @extends React.Component
 */
class SignIn extends React.Component {
  /**
   * @constructor
   * @extends React.Component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Handle onChange events on form inputs
   * @method onInputChange
   * @member SignIn
   * @param {string} field
   * @returns {function} a function that handles change event on inputs
   */
  onInputChange(field) {
    return (event) => {
      event.preventDefault();
      this.setState({ [field]: event.target.value });
    };
  }

  /**
   * render component
   * @method render
   * @member SignIn
   * @returns {object} component
   */
  render() {
    return (
      <form className="auth-form" id="log-in">
        <h4>Login to PostIt</h4>
        <div className="input-field">
          <i className="fa fa-user prefix" />
          <input
            type="text"
            id="username"
            placeholder="e.g. elementDeveloper"
            onChange={this.onInputChange('username')}
          />
          <label htmlFor="username">Username:</label>
        </div>
        <div className="input-field">
          <i className="fa fa-unlock-alt prefix" />
          <input
            type="password"
            id="pwd"
            placeholder="Enter password"
            onChange={this.onInputChange('password')}
          />
          <label htmlFor="pwd">Password:</label>
        </div>
        <a
          className="waves-effect waves-light btn"
          role="button"
          tabIndex="0"
          onClick={() => {
            this.props.onSubmit(this.state);
          }}
        >
          Log In
        </a>
        <div id="message"> Don&apos;t have a PostIt account? <a
          href="#!"
          id="go-to-signup"
        >Signup</a>
        </div>
      </form>
    );
  }
}

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default SignIn;
