import React from 'react';
import PropTypes from 'prop-types';
import SearchUserView from './SearchUserView';
import GroupMemberView from './GroupMemberView';

/**
 * display component for user search or group member view
 * @class UsersView
 * @extends React.Component
 */
class UsersView extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.addUserToGroup = this.addUserToGroup.bind(this);
  }
  /**
   * dispatch an action to add a user to a group
   * @method addUserToGroup
   * @param {object} user
   * @returns {void}
   */
  addUserToGroup(user) {
    this.props.addUserToGroup(user.id);
  }
  /**
   * render component
   * @method render
   * @memberof UsersView
   * @returns {object} component
   */
  render() {
    return (
      <div className="right-bar z-depth-1">
        <div className="close">
          <i
            className="material-icons"
            role="button"
            tabIndex="-1"
            onClick={this.props.hideRightBar}
          >clear</i>
        </div>
        {
          // eslint-disable-next-line
          (this.props.showSearchUserView) ? (
            <SearchUserView
              user={this.props.user}
              group={this.props.activeGroup}
              groupMembers={this.props.users}
              allUsers={this.props.allUsers}
              addUserToGroup={this.addUserToGroup}
              getUser={this.props.getUser}
              clearSelectedUser={
                this.props.clearSelectedUser
              }
            />
          ) : (this.props.showGroupMemberView) ?
          (
            <GroupMemberView
              user={this.props.user}
              users={this.props.users}
              selectUser={this.props.selectUser}
            />
          ) : null
        }
      </div>
    );
  }
}

UsersView.propTypes = {
  getUser: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  clearSelectedUser: PropTypes.func.isRequired,
  showSearchUserView: PropTypes.bool.isRequired,
  showGroupMemberView: PropTypes.bool.isRequired,
  hideRightBar: PropTypes.func.isRequired,
  addUserToGroup: PropTypes.func.isRequired,
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    username: PropTypes.string
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeGroup: PropTypes.string.isRequired
};

export default UsersView;
