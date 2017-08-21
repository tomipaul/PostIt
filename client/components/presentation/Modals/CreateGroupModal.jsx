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
    this.onInputChange = this.onInputChange.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }

  /**
   * Handle onChange events on form inputs
   * @method onInputChange
   * @memberof CreateGroupModal
   * @param {object} event
   * @returns {function} a function that handles change event on inputs
   */
  onInputChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * create group
   * @method createGroup
   * @memberof createGroupModal
   * @param {object} event
   * @return {function} an event handler that creates group
   * on click of submit button
   */
  createGroup(event) {
    event.preventDefault();
    const { name, description } = this.state;
    this.props.createGroup(name, description);
    this.setState({ name: '', description: '' });
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
                name="name"
                value={this.state.name}
                onChange={this.onInputChange}
                placeholder="Give a cool name"
                className="validate"
              />
              <input
                id="group_desc"
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.onInputChange}
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
            onClick={this.createGroup}
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
