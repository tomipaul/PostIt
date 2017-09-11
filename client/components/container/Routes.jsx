import React from 'react';
import axios from 'axios';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import PreloaderIcon, { ICON_TYPE } from 'react-preloader-icon';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadDashboard from '../container/LoadDashboard';
import AuthenticationPage from '../presentation/AuthenticationPage';
import NotFound from '../presentation/Common/NotFound';
import {
  validateUserToken as validateToken
} from '../../actions/actionCreators/UserActions';

const render = ({
  token,
  isAuthenticated,
  validateUserToken
}) =>
  (
    () => {
      if (token) {
        if (isAuthenticated) {
          return <LoadDashboard />;
        }
        validateUserToken();
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
    }
  );

const Routes = (props) => {
  const {
    isAuthenticated,
    validateUserToken
  } = props;
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
          path="/dashboard"
          render={render({
            token,
            isAuthenticated,
            validateUserToken
          })}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

Routes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  validateUserToken: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps,
{ validateUserToken: validateToken })(Routes));
