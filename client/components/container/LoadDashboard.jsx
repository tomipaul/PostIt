import { connect } from 'react-redux';
import Dashboard from '../presentation/Dashboard.jsx';
import {
  subscribeToMessages
} from '../../actions/actionCreators/SSEAction';
import {
  validateUserToken,
  getAllUsers,
  logOutSuccess
} from '../../actions/actionCreators/UserActions';


const mapStateToProps = state =>
  ({
    isAuth: state.auth.isAuthenticated
  });

const LoadDashboard = connect(
  mapStateToProps,
  {
    validateUserToken,
    getAllUsers,
    subscribeToMessages,
    logOut: logOutSuccess
  }
)(Dashboard);

export default LoadDashboard;
