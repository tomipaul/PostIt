import { connect } from 'react-redux';
import UsersView from '../presentation/Main/UsersView/Index.jsx';
import {
  getUser,
  selectUser,
  clearSelectedUser
} from '../../actions/actionCreators/UserActions';
import {
  addUserToGroup,
  getGroupUsers
} from '../../actions/actionCreators/GroupActions';

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    user: state.selectedUser,
    users: state.activeGroupUsers
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    selectUser: (user) => {
      dispatch(selectUser(user));
    },
    getUser: (username) => {
      dispatch(getUser(username));
    },
    addUserToGroup: (username) => {
      dispatch(addUserToGroup(username));
    },
    getGroupUsers: () => {
      dispatch(getGroupUsers());
    },
    clearSelectedUser: () => {
      dispatch(clearSelectedUser());
    }
  };
};

const ShowUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersView);

export default ShowUsers;
