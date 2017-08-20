import { connect } from 'react-redux';
import ErrorDialog from '../presentation/Common/ErrorDialog';
import { clearError } from '../../actions/actionCreators/errorAction';

const mapStateToProps = state =>
  ({
    error: state.logError[0]
  });

const ShowErrorDialog = connect(
  mapStateToProps,
  { clearError }
)(ErrorDialog);
export default ShowErrorDialog;
