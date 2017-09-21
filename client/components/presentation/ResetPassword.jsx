import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PreloaderIcon, { ICON_TYPE } from 'react-preloader-icon';
import Header from '../presentation/Header';
import {
  resetPassword
} from '../../actions/actionCreators/UserActions';
import {
  showErrorNotification
} from '../../actions/actionCreators/helpers';

/**
 * Display password input fields to enter new password
 * and a submit button to submit new password
 * @class ResetPassword
 * @extends React.Component
 */
export class ResetPassword extends React.Component {
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
   * @memberof ResetPassword
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
   * @memberof ResetPassword
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
   * @memberof ResetPassword
   * @returns {void}
   */
  submit() {
    const { password, verifyPassword } = this.state;
    if (password === verifyPassword) {
      this.props.resetPassword({
        password,
        token: this.props.match.params.token
      });
      this.setState({
        showPreloader: true
      });
    } else {
      this.props.showErrorNotification({
        message: 'Passwords do not match'
      });
    }
  }

  /**
   * render component
   * @method render
   * @member ResetPassword
   * @returns {object} component
   */
  render() {
    const { kind, message } = this.props.notifError;
    return (
      <div className="auth-container-board">
        <Header className="header-home" isDashboard={false} />
        <form className="auth-form">
          <h4>Reset password </h4>
          <div className="input-field">
            <input
              type="password"
              id="password"
              name="password"
              onChange={this.onInputChange}
            />
            <label htmlFor="email">Enter new password</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              id="verifyPassword"
              name="verifyPassword"
              onChange={this.onInputChange}
            />
            <label htmlFor="email">Re-enter password</label>
          </div>
          <a
            className="waves-effect waves-light btn"
            role="button"
            tabIndex="0"
            onClick={this.submit}
          >
            Submit
          </a><br />
          <Link to="/">Login</Link><br />
          <span>
            *The reset password link stays active for the next 12 hours
          </span>
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

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    })
  }).isRequired,
  resetPassword: PropTypes.func.isRequired,
  showErrorNotification: PropTypes.func.isRequired,
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
  { resetPassword, showErrorNotification }
)(ResetPassword);
