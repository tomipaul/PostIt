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
    this.onInputChange = this.onInputChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  /**
   * Handle onChange events on form inputs
   * @method onInputChange
   * @memberof SignUp
   * @param {object} event
   * @returns {function} a function that handles change event on inputs
   */
  onInputChange(event) {
    event.preventDefault();
    const inputName = event.target.name;
    const inputValue = event.target.value;
    this.setState({ [inputName]: inputValue });
  }

  /**
   * Submit username and password for authentication
   * This is called when the submit button is clicked
   * @method submit
   * @memberof SignUp
   * @returns {void}
   */
  submit() {
    const {
      username,
      password,
      email,
      phoneNo
    } = this.state;
    this.props.onSubmit(username, password, email, phoneNo);
  }

  /**
   * render component
   * @method render
   * @member SignUp
   * @returns {object} component
   */
  render() {
    return (
      <form className="auth-form" id="sign-up">
        <h4>Create a PostIt Account</h4>
        <div className="input-field">
          <i className="fa fa-user prefix" />
          <input
            type="text"
            id="username"
            name="username"
            onChange={this.onInputChange}
          />
          <label htmlFor="username">Username:</label>
        </div>
        <div className="input-field">
          <i className="fa fa-envelope prefix" />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g. element@postit.com"
            onChange={this.onInputChange}
          />
          <label htmlFor="email">Email:</label>
        </div>
        <div className="input-field">
          <i className="fa fa-phone prefix" />
          <input
            type="text"
            id="phone-no"
            name="phoneNo"
            placeholder="e.g +2348107976596"
            onChange={this.onInputChange}
          />
          <label htmlFor="phone-no">Phone No:</label>
        </div>
        <div className="input-field">
          <i className="fa fa-key prefix" />
          <input
            type="password"
            id="pwd"
            name="password"
            onChange={this.onInputChange}
          />
          <label htmlFor="pwd">Password:</label>
        </div>
        <a
          className="waves-effect waves-light btn"
          role="button"
          tabIndex="0"
          onClick={this.submit}
        >
          Sign Up
        </a>
        <div id="message"> Have a PostIt account? <a
          href="#!"
          id="go-to-login"
          onClick={this.props.showLogin}
        >Login</a>
        </div>
      </form>
    );
  }
}

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showLogin: PropTypes.func.isRequired
};

export default SignUp;
