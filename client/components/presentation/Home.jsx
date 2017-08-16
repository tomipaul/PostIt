import React from 'react';
import Header from '../presentation/Header/Index.jsx';
import AuthenticateUser from '../container/AuthenticateUser.jsx';
import ShowErrorDialog from '../container/ShowErrorDialog.jsx';

const Home = () => {
  return (
    <div className="auth-container-board">
      <Header className="header-home" isDashboard={false} />
      <AuthenticateUser />
      <ShowErrorDialog />
    </div>
  );
};

export default Home;
