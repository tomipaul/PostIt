import { connect } from 'react-redux';
import CreateGroupModal from '../presentation/Modals/CreateGroupModal.jsx';
import { createGroup } from '../../actions/actionCreators/GroupActions';

const CreateGroup = connect(
  null,
  { createGroup }
)(CreateGroupModal);

export default CreateGroup;
