import { connect } from 'react-redux';
import Footer from '../presentation/MessageArea/Index.jsx';
import { addMessageToGroup } from '../../actions/actionCreators/GroupActions';

const mapStateToProps = state =>
  ({
    dashboardIsActive: Boolean(state.activeGroup)
  });

const PostMessage = connect(
  mapStateToProps,
  { addMessageToGroup }
)(Footer);

export default PostMessage;
