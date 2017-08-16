import { connect } from 'react-redux';
import Authentication from '../presentation/Authentication/Index.jsx';
import { signUpUser, signInUser } from '../../actions/actionCreators/UserActions';

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpSubmit: ({ username, password, email, phoneNo }) => {
      dispatch(signUpUser(username, password, email, phoneNo));
    },
    onSignInSubmit: ({ username, password }) => {
      dispatch(signInUser(username, password));
    }
  };
};

const AuthenticateUser = connect(
  null,
  mapDispatchToProps
)(Authentication);

export default AuthenticateUser;
