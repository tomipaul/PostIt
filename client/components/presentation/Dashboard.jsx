import React from 'react';
import PropTypes from 'prop-types';
import Header from '../presentation/Header';
import ExploreGroup from '../container/ExploreGroup';
import PostMessage from '../container/PostMessage';
import CreateGroup from '../container/CreateGroup';
import ShowPreloader from '../container/ShowPreloader';
import UpdateProfilePicture from '../container/UpdateProfilePicture';

/**
 * @class DashboardView
 * @extends React.Component
 */
class Dashboard extends React.Component {
  /**
   * dispatch actions that make requests to get all users,
   * subscribe to message updates, fetch user groups, and
   * get unread messages
   * @method componentWillMount
   * @memberof Dashboard
   * @returns {void}
   */
  componentWillMount() {
    const {
      subscribeToMessages,
      getAllUsers,
      fetchUserGroups,
      getUnreadMessages
    } = this.props;
    getAllUsers();
    subscribeToMessages();
    fetchUserGroups();
    getUnreadMessages();
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
