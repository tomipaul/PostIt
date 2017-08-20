import React from 'react';
import PropTypes from 'prop-types';
import SideNav from './SideNav/Index.jsx';
import GroupHeader from './GroupHeader/Index.jsx';
import MessageBoard from './MessageBoard/Index.jsx';
import ShowUsers from '../../container/ShowUsers.jsx';

/**
 * @class Main
 * @extends React.Component
 */
class Main extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = { rightBar: false };
    this.showRightBar = this.showRightBar.bind(this);
    this.hideRightBar = this.hideRightBar.bind(this);
    this.showSearchUserView = this.showSearchUserView.bind(this);
    this.showGroupMemberView = this.showGroupMemberView.bind(this);
  }

  /**
   * load user groups
   * @method componentDidMount
   * @memberof Main
   * @returns {void}
   */
  componentDidMount() {
    const { loadUserGroups } = this.props;
    loadUserGroups();
  }

  /**
   * select a group and load group messages
   * @method componentDidMount
   * @memberof Main
   * @returns {void}
   */
  componentDidUpdate() {
    const { userGroups, selectedGroup, exploreGroup } = this.props;
    const defaultGroupId = userGroups.groupsById[0];
    const groupsCount = Object.keys(userGroups.groups).length;
    if (groupsCount && !selectedGroup) {
      exploreGroup(defaultGroupId);
    }
  }

  /**
   * show the right bar where users can search other users,
   * add them to groups and view their profiles
   * @method showRightBar
   * @memberof Main
   * @returns {void}
   */
  showRightBar() {
    $('.board-body, footer').addClass('show-right-bar');
    this.setState({
      rightBar: true,
      searchUserView: false,
      groupMemberView: false
    });
  }

  /**
   * hide the right bar
   * @method hideRightBar
   * @memberof Main
   * @returns {void}
   */
  hideRightBar() {
    this.setState({
      rightBar: false,
      searchUserView: false,
      groupMemberView: false
    });
    $('.board-body, footer').removeClass('show-right-bar');
  }

  /**
   * show search box where users can search other users
   * @method showSearchUserView
   * @memberof Main
   * @returns {void}
   */
  showSearchUserView() {
    this.showRightBar();
    this.setState({ searchUserView: true });
  }

  /**
   * show a list of all users that belong to a group
   * @method showMemberlist
   * @memberof Main
   * @returns {void}
   */
  showGroupMemberView() {
    const { getGroupUsers } = this.props;
    getGroupUsers();
    this.showRightBar();
    this.setState({ groupMemberView: true });
  }
  /**
   * render component
   * @method render
   * @memberof Main
   * @returns {object} Component
   */
  render() {
    const {
      user,
      userGroups,
      unreadCountObject,
      selectedGroup,
      selectedGroupMessages,
      exploreGroup
    } = this.props;
    return (
      <main className="board-body">
        <SideNav
          username={user.username || ''}
          groups={userGroups.groups || []}
          unreadCountObject={unreadCountObject}
          exploreGroup={exploreGroup}
          imageLink={user.photoURL}
        />
        {
          (selectedGroup) ? (
            <GroupHeader
              name={userGroups.groups[selectedGroup].name || ''}
              description={
                userGroups.groups[selectedGroup].description || ''
              }
              showSearchUserView={this.showSearchUserView}
              showGroupMemberView={this.showGroupMemberView}
            />
          ) : (
            <GroupHeader
              name={''}
              description={'No subscribed groups'}
              showSearchUserView={this.showSearchUserView}
              showGroupMemberView={this.showGroupMemberView}
            />
          )
        }
        <MessageBoard
          messages={selectedGroupMessages}
        />
        {
          (this.state.rightBar) ?
          (
            <ShowUsers
              hideRightBar={this.hideRightBar}
              showSearchUserView={this.state.searchUserView}
              showGroupMemberView={this.state.groupMemberView}
            />
          ) : null
        }
      </main>
    );
  }
}

Main.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNo: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  userGroups: PropTypes.shape({
    groups: PropTypes.object,
    groupsById: PropTypes.array
  }).isRequired,
  selectedGroup: PropTypes.string,
  selectedGroupMessages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    priority: PropTypes.string
  })).isRequired,
  unreadCountObject: PropTypes.objectOf(PropTypes.number),
  exploreGroup: PropTypes.func.isRequired,
  loadUserGroups: PropTypes.func.isRequired,
  getGroupUsers: PropTypes.func.isRequired
};

Main.defaultProps = {
  selectedGroup: '',
  selectedGroupMessages: [],
  unreadCountObject: {}
};

export default Main;

