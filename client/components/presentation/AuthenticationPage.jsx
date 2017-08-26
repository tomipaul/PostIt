import React from 'react';
import Header from '../presentation/Header/Index.jsx';
import AuthenticateUser from '../container/AuthenticateUser.jsx';

const AuthenticationPage = () =>
  (
    <div className="auth-container-board">
      <Header className="header-home" isDashboard={false} />
      <AuthenticateUser />
    </div>
  );

export default AuthenticationPage;
