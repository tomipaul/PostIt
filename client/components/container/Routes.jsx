import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadDashboard from '../container/LoadDashboard.jsx';
import Home from '../presentation/Home.jsx';

const Routes = () => {
  const token = window.localStorage.getItem('auth_token');
  return (
    <div>
      <Route
        path="/dashboard"
        render={() => {
          return (!token) ?
          (<Redirect to="/" />) :
          (<LoadDashboard />);
        }}
      />
      <Route
        exact
        path="/"
        render={() => {
          return (token) ?
          (<Redirect to="/dashboard" />) :
          (<Home />);
        }}
      />
    </div>
  );
};

Routes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps)(Routes));
