import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox';
import MemberListView from './MemberListView';

/**
 * Display search input and search results
 * @class SearchUserview
 * @extends React.Component
 */
class SearchUserView extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      matchedUsers: []
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onKeyPressEnterSearch = this.onKeyPressEnterSearch
    .bind(this);
    this.getUsersNotInGroup = this.getUsersNotInGroup.bind(this);
  }
  /**
   * clear selected user before search
   * @method ComponentDidMount
   * @memberof SearchUserView
   * @return {void}
   */
  componentDidMount() {
    this.props.clearSelectedUser();
  }
  /**
   * Remove a user from list of displayed users after
   * the user has been added to group
   * @method componentWillReceiveProps
   * @memberof SearchUserView
   * @param {object} nextProps
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    const { groupMembers, group } = nextProps;
    if (group !== this.props.group) {
      return this.setState({
        searchString: '',
        matchedUsers: []
      });
    }
    if (groupMembers.length !== this.props.groupMembers.length) {
      const newUser = groupMembers[groupMembers.length - 1];
      const newMatchedUsers = this.state.matchedUsers
      .filter(user =>
        user.username !== newUser.username
      );
      this.setState({ matchedUsers: newMatchedUsers });
    }
  }
  /**
   * event handler: handle change in search box input
   * @method onInputChange
   * @memberof SearchUserView
   * @param {object} event
   * @return {void}
   */
  onInputChange(event) {
    event.preventDefault();
    const searchString = event.target.value;
    const users = this.getUsersNotInGroup();
    const matchedUsers = users.filter(user =>
      (
        (searchString) ?
        (user.username.toLowerCase())
        .startsWith(searchString.toLowerCase()) :
        false
      )
    );
    this.setState({
      searchString: event.target.value,
      matchedUsers
    });
  }
  /**
   * event handler: handle click on search button
   * @method onClickSearch
   * @memberof SearchUserView
   * @param {object} event
   * @return {void}
   */
  onClickSearch(event) {
    event.preventDefault();
    this.props.getUser(this.state.searchString);
  }
  /**
   * event handler: handle keypress `enter` on searchbox input
   * @method onKeyPressEnterSearch
   * @memberof SearchUserView
   * @param {object} event
   * @return {void}
   */
  onKeyPressEnterSearch(event) {
    if (event.key === 'Enter') {
      this.props.getUser(this.state.searchString);
    }
  }
  /**
   * get all users that do not belong to the active group
   * @method getUsersNotInGroup
   * @returns {void}
   */
  getUsersNotInGroup() {
    const { allUsers, groupMembers } = this.props;
    return allUsers.filter(user =>
      !(groupMembers.find(userInGroup =>
        (user.username === userInGroup.username)
      ))
    );
  }
  /**
   * render component
   * @method render
   * @memberof SearchUserView
   * @returns {object} component
   */
  render() {
    return (
      <div>
        <SearchBox
          value={this.state.searchString}
          onChange={this.onInputChange}
          onKeyPress={this.onKeyPressEnterSearch}
          onClick={this.onClickSearch}
        />
        <MemberListView
          users={this.state.matchedUsers}
          selectUser={this.props.addUserToGroup}
          isSearchUserView
        />
      </div>
    );
  }
}

SearchUserView.propTypes = {
  getUser: PropTypes.func.isRequired,
  addUserToGroup: PropTypes.func.isRequired,
  clearSelectedUser: PropTypes.func.isRequired,
  allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
  group: PropTypes.string.isRequired
};

export default SearchUserView;

