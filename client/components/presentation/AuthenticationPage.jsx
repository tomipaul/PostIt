import React from 'react';
import Header from '../presentation/Header';
import AuthenticateUser from '../container/AuthenticateUser';

/**
 * Authentication Page; signup and signin
 * @function AuthenticationPage
 * @return {object} AuthenticationPage component
 */
const AuthenticationPage = () =>
  (
    <div className="auth-container-board">
      <Header className="header-home" isDashboard={false} />
      <AuthenticateUser />
    </div>
  );

export default AuthenticationPage;
