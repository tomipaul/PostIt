import React from 'react';
import PropTypes from 'prop-types';
import Header from '../presentation/Header/Index.jsx';
import ExploreGroup from '../container/ExploreGroup.jsx';
import PostMessage from '../container/PostMessage.jsx';
import CreateGroup from '../container/CreateGroup.jsx';
import ShowPreloader from '../container/ShowPreloader.jsx';
import UpdateProfilePicture from '../container/UpdateProfilePicture.jsx';
import ShowErrorDialog from '../container/ShowErrorDialog.jsx';

/**
 * @class DashboardView
 * @extends React.Component
 */
class Dashboard extends React.Component {
  /**
   * @method componentDidMount
   * @param {object} props
   * @return {void}
   */
  componentDidMount() {
    const {
      validateUserToken,
      isAuth
    } = this.props;
    const token = window.localStorage.getItem('auth_token');
    if (token && !isAuth) {
      validateUserToken();
    }
  }

  /**
   * @method componentWillReceiveProps
   * @param {object} nextProps
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    const { getAllUsers } = this.props;
    if (nextProps.isAuth) {
      getAllUsers();
    }
  }

  /**
   * render component
   * @method render
   * @returns {object} component
   */
  render() {
    return (
      <div>
        <Header
          isDashboard
          isAuth={this.props.isAuth}
          logOut={this.props.logOut}
        />
        <ExploreGroup />
        <PostMessage />
        <CreateGroup />
        <ShowPreloader id="main-preloader" />
        <UpdateProfilePicture />
        <ShowErrorDialog />
      </div>
    );
  }
}

Dashboard.propTypes = {
  validateUserToken: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};

export default Dashboard;
