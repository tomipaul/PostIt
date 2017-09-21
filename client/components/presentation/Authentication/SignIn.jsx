import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * SignIn component
 * @class SignIn
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
    this.onInputChange = this.onInputChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  /**
   * Handle onChange events on form inputs
   * @method onInputChange
   * @memberof SignIn
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
   * @memberof SignIn
   * @returns {void}
   */
  submit() {
    const { username, password } = this.state;
    this.props.onSubmit(username, password);
  }
  /**
   * render login component
   * @method render
   * @member SignIn
   * @returns {object} component
   */
  render() {
    return (
      <form className="auth-form" id="log-in" >
        <h4>Login to PostIt</h4>
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
          <i className="fa fa-unlock-alt prefix" />
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
          Log In
        </a>
        <div id="message"> Don&apos;t have a PostIt account? <a
          href="#!"
          id="go-to-signup"
          onClick={this.props.showSignup}
        >Signup</a>
        </div>
        <Link to="/password/reset">Forgot Password</Link>
      </form>
    );
  }
}

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showSignup: PropTypes.func.isRequired
};

export default SignIn;
