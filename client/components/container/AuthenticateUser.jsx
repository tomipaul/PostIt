import { connect } from 'react-redux';
import Authentication from '../presentation/Authentication/Index.jsx';
import { signUpUser, signInUser } from '../../actions/actionCreators/UserActions';

const AuthenticateUser = connect(
  null,
  { signUpUser, signInUser }
)(Authentication);

export default AuthenticateUser;
