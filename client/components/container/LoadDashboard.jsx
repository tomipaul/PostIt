import { connect } from 'react-redux';
import Dashboard from '../presentation/Dashboard.jsx';
import {
  validateUserToken,
  logOutSuccess
} from '../../actions/actionCreators/UserActions';

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onReload: () => {
      dispatch(validateUserToken());
    },
    logOut: () => {
      dispatch(logOutSuccess());
    }
  };
};

const LoadDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default LoadDashboard;
