import React from 'react';
import axios from 'axios';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import PreloaderIcon, { ICON_TYPE } from 'react-preloader-icon';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadDashboard from '../container/LoadDashboard';
import AuthenticationPage from '../presentation/AuthenticationPage';
import ForgotPasswordPage from '../presentation/ForgotPassword';
import ResetPasswordPage from '../presentation/ResetPassword';
import NotFoundPage from '../presentation/Common/NotFound';
import {
  validateUserToken as validateToken
} from '../../actions/actionCreators/UserActions';

/**
 * @class Routes
 * @extends React.Component
 */
class Routes extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.renderDashboard = this.renderDashboard.bind(this);
  }
  /**
   * @method componentDidMount
   * @memberof Routes
   * @returns {void}
   */
  componentDidMount() {
    const token = window.localStorage.getItem('auth_token');
    const { isAuthenticated, validateUserToken } = this.props;
    if (token && !isAuthenticated) {
      validateUserToken();
    }
  }
  /**
   * @method renderDashboard
   * @memberof Routes
   * @return {object} component
   */
  renderDashboard() {
    const {
      isAuthenticated
    } = this.props;
    const token = window.localStorage.getItem('auth_token');
    return () => {
      if (token) {
        if (isAuthenticated) {
          return <LoadDashboard />;
        }
        return (
          <span className="before-auth">
            <PreloaderIcon
              type={ICON_TYPE.SPINNING}
              size={100}
              strokeWidth={8}
              strokeColor="#006064"
              duration={800}
            />
          </span>
        );
      }
      return <Redirect to="/" />;
    };
  }
  /**
   * @method render
   * @memberof Routes
   * @return {object} component
   */
  render() {
    const token = window.localStorage.getItem('auth_token');
    axios.defaults.headers.common.Authorization = token;
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              (!token) ?
                <AuthenticationPage />
                : <Redirect to="/dashboard" />
            )}
          />
          <Route
            exact
            path="/dashboard"
            render={this.renderDashboard()}
          />
          <Route exact path="/password/reset" component={ForgotPasswordPage} />
          <Route path="/password/reset/:token" component={ResetPasswordPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

Routes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  validateUserToken: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps,
{ validateUserToken: validateToken })(Routes));
