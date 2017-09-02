import React from 'react';
import PropTypes from 'prop-types';
import Header from '../presentation/Header/Index.jsx';
import ExploreGroup from '../container/ExploreGroup.jsx';
import PostMessage from '../container/PostMessage.jsx';
import CreateGroup from '../container/CreateGroup.jsx';
import ShowPreloader from '../container/ShowPreloader.jsx';
import UpdateProfilePicture from '../container/UpdateProfilePicture.jsx';

/**
 * @class DashboardView
 * @extends React.Component
 */
class Dashboard extends React.Component {
  /**
   * @constructor
   * @extends React.Component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    const {
      isAuth,
      subscribeToMessages,
      getAllUsers,
      fetchUserGroups,
      getUnreadMessages
    } = this.props;
    const token = window.localStorage.getItem('auth_token');
    if (token && isAuth) {
      getAllUsers();
      subscribeToMessages();
      fetchUserGroups();
      getUnreadMessages();
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
      </div>
    );
  }
}

Dashboard.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  subscribeToMessages: PropTypes.func.isRequired,
  fetchUserGroups: PropTypes.func.isRequired,
  getUnreadMessages: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
};

export default Dashboard;
