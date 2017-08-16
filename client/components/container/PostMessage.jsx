import { connect } from 'react-redux';
import Footer from '../presentation/Footer/Index.jsx';
import { addMessageToGroup } from '../../actions/actionCreators/GroupActions';

const mapStateToProps = (state) => {
  return {
    dashboardIsActive: Boolean(state.activeGroup)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (message) => {
      dispatch(addMessageToGroup(message));
    }
  };
};

const PostMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);

export default PostMessage;
