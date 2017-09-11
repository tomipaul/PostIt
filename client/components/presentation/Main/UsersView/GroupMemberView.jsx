import React from 'react';
import PropTypes from 'prop-types';
import MemberListView from './MemberListView';
import UserProfileView from './UserProfileView';

/**
 * @class GroupMemberView
 * @extends React.Component
 */
class GroupMemberView extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      profileView: false,
      listView: true
    };
    this.showProfileView = this.showProfileView.bind(this);
    this.showListView = this.showListView.bind(this);
  }
  /**
   * get and display selected user profile
   * @method showProfileView
   * @memberof GroupMemberView
   * @param {object} user
   * @returns {void}
   */
  showProfileView(user) {
    this.props.selectUser(user);
    this.setState({
      listView: false,
      profileView: true
    });
  }
  /**
   * display all members of a group
   * @method showProfileView
   * @memberof GroupMemberView
   * @returns {void}
   */
  showListView() {
    this.setState({
      listView: true,
      profileView: false
    });
  }
  /**
   * render component
   * @method render
   * @memberof GroupMemberView
   * @returns {object} component
   */
  render() {
    const { users, user } = this.props;
    return (
      <div>
        {
          // eslint-disable-next-line
          (this.state.listView) ?
          (<MemberListView
            users={users}
            selectUser={this.showProfileView}
            isGroupMemberView
          />)
          : (this.state.profileView) ?
          (
            <div>
              <div className="back">
                <i
                  className="material-icons"
                  role="button"
                  tabIndex="-1"
                  onClick={this.showListView}
                >arrow_back</i>
              </div>
              <UserProfileView
                user={user}
              />
            </div>
          ) : null
        }
      </div>
    );
  }
}

GroupMemberView.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNo: PropTypes.string,
    status: PropTypes.string
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectUser: PropTypes.func.isRequired,
};

export default GroupMemberView;
