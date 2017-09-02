import { connect } from 'react-redux';
import Main from '../presentation/Main/Index.jsx';
import {
  selectGroup,
  getGroupMessages,
  getGroupUsers,
  readUnreadGroupMessages
} from '../../actions/actionCreators/GroupActions';

const mapStateToProps = state =>
  ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    userGroups: state.userGroups,
    unreadMessages: state.unreadMessages,
    selectedGroup: state.activeGroup,
    selectedGroupMessages: state.activeGroupMessages
  });

const mapDispatchToProps = dispatch =>
  ({
    exploreGroup: (groupId) => {
      dispatch(selectGroup(groupId));
      dispatch(getGroupMessages());
      dispatch(getGroupUsers());
    },
    readUnreadGroupMessages: () => {
      dispatch(readUnreadGroupMessages());
    }
  });

const ExploreGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default ExploreGroup;
