import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class CreateGroupModal
 * @extends React.Component
 */
class CreateGroupModal extends React.Component {
  /**
   * @constructor
   * @extends React.Component
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Handle onChange events on form inputs
   * @method onInputChange
   * @memberof CreateGroupModal
   * @param {string} field
   * @returns {function} a function that handles change event on inputs
   */
  onInputChange(field) {
    return (event) => {
      event.preventDefault();
      this.setState({ [field]: event.target.value });
    };
  }

  /**
   * render component
   * @method render
   * @memberof CreateGroupModal
   * @returns {object} component
   */
  render() {
    return (
      <div id="modal1" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>Create a Group</h4>
          <form>
            <div className="input-field create-group">
              <input
                id="group_name"
                type="text"
                onChange={this.onInputChange('name')}
                placeholder="Give a cool name"
                className="validate"
              />
              <input
                id="group_desc"
                type="text"
                onChange={this.onInputChange('description')}
                placeholder="Describe your group"
                className="validate"
              />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-action modal-close waves-effect waves-green btn-flat"
            onClick={() => {
              const { name, description } = this.state;
              this.props.createGroup(name, description);
              this.setState({ name: '', description: '' });
            }}
          >Create<i className="material-icons right">send</i></a>
        </div>
      </div>
    );
  }
}

CreateGroupModal.propTypes = {
  createGroup: PropTypes.func.isRequired
};

export default CreateGroupModal;
