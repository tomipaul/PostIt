import { connect } from 'react-redux';
import Preloader from '../presentation/Common/Preloader';

const mapStateToProps = (state, ownProps) =>
  ({
    id: ownProps.id,
    requestCount: state.requestCount
  });

const ShowPreloader = connect(mapStateToProps)(Preloader);
export default ShowPreloader;
