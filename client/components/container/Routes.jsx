import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadDashboard from '../container/LoadDashboard.jsx';
import AuthenticationPage from '../presentation/AuthenticationPage.jsx';

const Routes = () => {
  const token = window.localStorage.getItem('auth_token');
  return (
    <div>
      <Route
        path="/dashboard"
        render={() =>
          ((!token) ?
          (<Redirect to="/" />) :
          (<LoadDashboard />))
        }
      />
      <Route
        exact
        path="/"
        render={() => ((token) ?
          (<Redirect to="/dashboard" />) :
          (<AuthenticationPage />))}
      />
    </div>
  );
};

Routes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(Routes));
