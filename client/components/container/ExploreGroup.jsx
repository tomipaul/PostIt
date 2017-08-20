import { connect } from 'react-redux';
import Main from '../presentation/Main/Index.jsx';
import {
  selectGroup,
  getGroupMessages,
  getGroupUsers
} from '../../actions/actionCreators/GroupActions';
import {
  fetchUserGroups
} from '../../actions/actionCreators/UserActions';

const mapStateToProps = state =>
  ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    userGroups: state.userGroups,
    unreadCountObject: state.unreadCountObject,
    selectedGroup: state.activeGroup,
    selectedGroupMessages: state.activeGroupMessages
  });

const mapDispatchToProps = dispatch =>
  ({
    exploreGroup: (groupId) => {
      dispatch(selectGroup(groupId));
      dispatch(getGroupMessages());
    },
    loadUserGroups: () => {
      dispatch(fetchUserGroups());
    },
    getGroupUsers: () => {
      dispatch(getGroupUsers());
    }
  });

const ExploreGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default ExploreGroup;
