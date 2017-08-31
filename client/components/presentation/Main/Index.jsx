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
    this.filterUnreadMessages = this.filterUnreadMessages.bind(this);
    this.readUnreadGroupMessages = this.readUnreadGroupMessages.bind(this);
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
   * @method componentDidUpdate
   * @memberof Main
   * @returns {void}
   */
  componentDidUpdate() {
    const {
      userGroups,
      selectedGroup,
      exploreGroup
    } = this.props;
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
    this.showRightBar();
    this.setState({ groupMemberView: true });
  }

  /**
   * get unread messages in a group or return all messages
   * if unread count is 0
   * @method filterUnreadMessages
   * @memberof Main
   * @returns {array.object} An array of unread messages or
   * all messages in selected group
   */
  filterUnreadMessages() {
    const {
      unreadMessages,
      selectedGroup,
      selectedGroupMessages
    } = this.props;
    const unreadCount = (unreadMessages[selectedGroup]) ?
    unreadMessages[selectedGroup].length : 0;
    return (unreadCount > 15) ?
    selectedGroupMessages.slice(-unreadCount)
    : selectedGroupMessages.slice(-15);
  }
  /**
   * explore a selected group
   * @method readUnreadGroupMessages
   * @memberof Main
   * @param {object} event
   * @returns {void}
   */
  readUnreadGroupMessages(event) {
    const {
      readUnreadGroupMessages,
      unreadMessages,
      selectedGroup
    } = this.props;
    if (unreadMessages[selectedGroup]) {
      const elem = event.target;
      const unreadNotEmpty = unreadMessages[selectedGroup].length;
      if (unreadNotEmpty &&
      elem.scrollHeight - elem.scrollTop === elem.clientHeight) {
        readUnreadGroupMessages();
      }
    }
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
      exploreGroup,
      unreadMessages,
      selectedGroup
    } = this.props;
    return (
      <main className="board-body">
        <SideNav
          username={user.username || ''}
          groups={userGroups.groups || []}
          unreadMessages={unreadMessages}
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
          messages={this.filterUnreadMessages()}
          onScroll={this.readUnreadGroupMessages}
          onFocus={this.readUnreadGroupMessages}
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
  unreadMessages: PropTypes.objectOf(PropTypes.array).isRequired,
  exploreGroup: PropTypes.func.isRequired,
  loadUserGroups: PropTypes.func.isRequired,
  readUnreadGroupMessages: PropTypes.func.isRequired
};

Main.defaultProps = {
  selectedGroup: '',
  selectedGroupMessages: [],
  unreadMessages: {}
};

export default Main;

