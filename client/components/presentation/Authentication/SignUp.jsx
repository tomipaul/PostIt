import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class SignUp
 * @extends React.Component
 */
class SignUp extends React.Component {
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
   * @member SignUp
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
   * @member SignUp
   * @returns {object} component
   */
  render() {
    return (
      <form className="hidden auth-form" id="sign-up">
        <h4>Create a PostIt Account</h4>
        <div className="input-field">
          <i className="fa fa-user prefix" />
          <input
            type="text"
            id="username"
            placeholder="e.g Tomi Paul"
            onChange={this.onInputChange('username')}
          />
          <label htmlFor="username">Username:</label>
        </div>
        <div className="input-field">
          <i className="fa fa-envelope prefix" />
          <input
            type="email"
            id="email"
            placeholder="e.g. element@postit.com"
            onChange={this.onInputChange('email')}
          />
          <label htmlFor="email">Email:</label>
        </div>
        <div className="input-field">
          <i className="fa fa-phone prefix" />
          <input
            type="text"
            id="phone-no"
            placeholder="e.g +2348107976596"
            onChange={this.onInputChange('phoneNo')}
          />
          <label htmlFor="phone-no">Phone No:</label>
        </div>
        <div className="input-field">
          <i className="fa fa-key prefix" />
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
          Sign Up
        </a>
        <div id="message"> Have a PostIt account? <a
          href="#!"
          id="go-to-login"
        >Login</a>
        </div>
      </form>
    );
  }
}

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default SignUp;
