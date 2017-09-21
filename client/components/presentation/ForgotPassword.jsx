import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PreloaderIcon, { ICON_TYPE } from 'react-preloader-icon';
import Header from '../presentation/Header';
import {
  sendPasswordResetMail
} from '../../actions/actionCreators/UserActions';

/**
 * display email input field to enter email
 * and a submit button to submit
 * @class ForgotPassword
 * @extends React.Component
 */
export class ForgotPassword extends React.Component {
  /**
   * @constructor
   * @extends React.Component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = { showPreloader: false };
    this.onInputChange = this.onInputChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  /**
   * @method componentWillRecieveProps
   * @memberof ForgotPassword
   * @param {object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const { notifError } = nextProps;
    if (Object.keys(notifError).length >
    Object.keys(this.props.notifError).length) {
      this.setState({
        showPreloader: false
      });
    }
  }
  /**
   * Handle onChange events on form inputs
   * @method onInputChange
   * @memberof ForgotPassword
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
   * @memberof ForgotPassword
   * @returns {void}
   */
  submit() {
    const { email } = this.state;
    this.props.sendPasswordResetMail(email);
    this.setState({
      showPreloader: true
    });
  }

  /**
   * render component
   * @method render
   * @member ForgotPassword
   * @returns {object} component
   */
  render() {
    const { kind, message } = this.props.notifError;
    return (
      <div className="auth-container-board">
        <Header className="header-home" isDashboard={false} />
        <form className="auth-form">
          <h4>Enter email to reset password </h4>
          <div className="input-field">
            <input
              type="email"
              id="email"
              name="email"
              onChange={this.onInputChange}
            />
            <label htmlFor="email">Enter email</label>
          </div>
          <a
            className="waves-effect waves-light btn"
            role="button"
            tabIndex="0"
            onClick={this.submit}
          >
            Submit
          </a><br />
          <Link to="/">Back to Login</Link>
          {
            Object.keys(this.props.notifError).length ?
              <p
                style={{
                  color: (kind === 'danger') ? 'red' : 'green',
                  fontSize: '12px'
                }}
              >*{message}</p> : null
          }
          <br />
          {
            this.state.showPreloader ?
              <PreloaderIcon
                type={ICON_TYPE.SPINNING}
                size={40}
                strokeWidth={8}
                strokeColor="#006064"
                duration={800}
              /> : null
          }
        </form>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  sendPasswordResetMail: PropTypes.func.isRequired,
  notifError: PropTypes.shape({
    message: PropTypes.string,
    kind: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({
  notifError: (state.notifs[0]) ? state.notifs[0]
  : {}
});

export default connect(
  mapStateToProps,
  { sendPasswordResetMail }
)(ForgotPassword);
