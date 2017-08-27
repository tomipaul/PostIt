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
    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
   * Handle onChange events on form inputs
   * @method onInputChange
   * @member SignIn
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
   * render component
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
          onClick={() => {
            const { username, password } = this.state;
            this.props.onSubmit(username, password);
          }}
        >
          Log In
        </a>
        <div id="message"> Don&apos;t have a PostIt account? <a
          href="#!"
          id="go-to-signup"
          onClick={this.props.showSignup}
        >Signup</a>
        </div>
      </form>
    );
  }
}

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showSignup: PropTypes.func.isRequired
};

export default SignIn;
