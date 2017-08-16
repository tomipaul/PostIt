import React from 'react';

/**
 * @class CommonModal
 * @extends React.Component
 */
class CommonModal extends React.Component {
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
   * @member CreateGroupModal
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
   * @member CreateGroupModal
   * @returns {object} component
   */
  render() {
    return (
      <div id={this.state.id} className="modal modal-fixed-footer">
        <div className="modal-content">{this.state.content}
        </div>
        <div className="modal-footer">{this.state.footer}
        </div>
      </div>
    );
  }
}

export default CommonModal;
