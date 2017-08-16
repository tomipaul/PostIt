import { connect } from 'react-redux';
import UploadPictureModal from '../presentation/Modals/UploadPictureModal.jsx';
import { updateProfilePicture } from '../../actions/actionCreators/UserActions';

const mapStateToProps = (state) => {
  return {
    image: state.auth.user.photoURL,
    username: state.auth.user.username
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (file) => {
      dispatch(updateProfilePicture(file));
    }
  };
};

const UpdateProfilePicture = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadPictureModal);

export default UpdateProfilePicture;
