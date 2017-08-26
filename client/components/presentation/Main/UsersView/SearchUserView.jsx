import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox.jsx';
import MemberListView from './MemberListView.jsx';

/**
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
   * event handler: handle change in search box input
   * @method onInputChange
   * @memberof SearchUserView
   * @param {object} event
   * @return {void}
   */
  onInputChange(event) {
    event.preventDefault();
    const searchString = event.target.value;
    const { users } = this.props;
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
   * render component
   * @method render
   * @memberof SearchUserView
   * @returns {object} component
   */
  render() {
    return (
      <div>
        <SearchBox
          onChange={this.onInputChange}
          onKeyPress={this.onKeyPressEnterSearch}
          onClick={this.onClickSearch}
        />
        <MemberListView
          users={this.state.matchedUsers}
          selectUser={this.props.addUserToGroup}
          flags={['isSearchUserView']}
        />
      </div>
    );
  }
}

SearchUserView.propTypes = {
  getUser: PropTypes.func.isRequired,
  addUserToGroup: PropTypes.func.isRequired,
  clearSelectedUser: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SearchUserView;

