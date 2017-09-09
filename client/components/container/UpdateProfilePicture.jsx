import { connect } from 'react-redux';
import UploadPictureModal from '../presentation/Modals/UploadPictureModal';
import { updateProfilePicture } from '../../actions/actionCreators/UserActions';

const mapStateToProps = state =>
  ({
    image: state.auth.user.photoURL,
    username: state.auth.user.username
  });

const UpdateProfilePicture = connect(
  mapStateToProps,
  { updateProfilePicture }
)(UploadPictureModal);

export default UpdateProfilePicture;
