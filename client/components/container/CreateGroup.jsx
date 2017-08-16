import { connect } from 'react-redux';
import CreateGroupModal from '../presentation/Modals/CreateGroupModal.jsx';
import { createGroup } from '../../actions/actionCreators/GroupActions';

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: ({ name, description }) => {
      dispatch(createGroup(name, description));
    }
  };
};

const CreateGroup = connect(
  null,
  mapDispatchToProps
)(CreateGroupModal);

export default CreateGroup;
