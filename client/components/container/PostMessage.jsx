import { connect } from 'react-redux';
import MessageArea from '../presentation/MessageArea/Index.jsx';
import { addMessageToGroup } from '../../actions/actionCreators/GroupActions';

const mapStateToProps = state =>
  ({
    activeGroup: state.activeGroup || ''
  });

const PostMessage = connect(
  mapStateToProps,
  { addMessageToGroup }
)(MessageArea);

export default PostMessage;
