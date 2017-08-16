import { connect } from 'react-redux';
import ErrorDialog from '../presentation/Common/ErrorDialog';
import { clearError } from '../../actions/actionCreators/errorAction';

const mapStateToProps = (state) => {
  return {
    error: state.logError[0]
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearError: () => {
      dispatch(clearError());
    }
  };
};

const ShowErrorDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorDialog);
export default ShowErrorDialog;
