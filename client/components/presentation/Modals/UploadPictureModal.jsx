import React from 'react';
import PropTypes from 'prop-types';
import CommonModal from '../Common/CommonModal.jsx';
import ShowPreloader from '../../container/ShowPreloader.jsx';
/**
 * @class UploadPictureModal
 * @extends CommonModal
 */
class UploadPictureModal extends CommonModal {
  /**
   * @constructor
   * @extends React.Component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.triggerFileSelect = this.triggerFileSelect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  /**
   * trigger file selection
   * @method triggerFileSelect
   * @memberof UploadPictureModal
   * @return {void}
   */
  triggerFileSelect() {
    this.fileinput.click();
  }
  /**
   * set content of modal
   * @method setContentAndFooter
   * @memberof UploadPictureModal
   * @return {void}
   */
  render() {
    this.state.id = 'user1';
    this.state.content = (
      <div>
        <ShowPreloader id="modal-preloader" />
        <h4>Change profile picture</h4> <i
          className="fa fa-picture-o"
        />
        <img
          className="current-profile-photo responsive-img"
          src={this.props.image}
          alt={this.props.username}
        />
        <a
          className="btn-floating btn-large waves-effect waves-light teal upload"
          onClick={this.triggerFileSelect}
          role="button"
          tabIndex="0"
        ><i className="fa fa-folder-open-o" />
        </a>
        <input
          type="file"
          ref={(fileinput) => { this.fileinput = fileinput; }}
          id="upload-input"
          className="hidden"
        />
        {/*<span className="fileName">{this.fileinput.files[0].name}
        </span>*/}
      </div>
    );
    this.state.footer = (
      <a
        href="#!"
        className="modal-action modal-close waves-effect waves-green btn-flat"
        onClick={() => {
          this.props.onSubmit(this.fileinput.files[0]);
        }}
      >Upload<i className="material-icons right">send</i></a>
    );
    return super.render();
  }
}

UploadPictureModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  image: PropTypes.string,
  username: PropTypes.string
};
UploadPictureModal.defaultProps = {
  image: null,
  username: null
};
export default UploadPictureModal;
