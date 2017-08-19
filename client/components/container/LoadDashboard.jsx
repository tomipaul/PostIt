import { connect } from 'react-redux';
import Dashboard from '../presentation/Dashboard.jsx';
import {
  validateUserToken,
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
    logOut: logOutSuccess
  }
)(Dashboard);

export default LoadDashboard;
