import React from 'react';
import PropTypes from 'prop-types';
import PrioritySelect from './PrioritySelect.jsx';
import TextBox from './TextBox.jsx';
import SubmitButton from './SubmitButton.jsx';

/**
 * @class Footer
 * @extends React.Component
 */
class MessageArea extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onPrioritySelect = this.onPrioritySelect.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  }
  /**
   * event handler: submit message
   * @method onSubmitMessage
   * @param {object} event
   * @returns {void}
   */
  onSubmitMessage() {
    this.props.addMessageToGroup(this.state);
    this.setState({ text: '', priority: 'normal' });
  }
  /**
   * event handler: set local state when text in TextBox changes
   * @method
   * @param {object} event
   * @returns {void}
   */
  onMessageChange(event) {
    event.preventDefault();
    this.setState({ text: event.target.value });
  }

  /**
   * event handler: set local state when message priority is selected
   * @method
   * @param {object} event
   * @returns {void}
   */
  onPrioritySelect(event) {
    event.preventDefault();
    this.setState({
      priority: event.target.getAttribute('data-priority')
    });
  }
  /**
   * render component
   * @method
   * @returns {object} component
   */
  render() {
    const { dashboardIsActive } = this.props;
    return (
      (dashboardIsActive) ?
      (
        <footer>
          <div className="message-input row">
            <TextBox
              message={this.state.text}
              changeMessage={this.onMessageChange}
              onSubmitMessage={this.onSubmitMessage}
            />
            <PrioritySelect
              selectPriority={this.onPrioritySelect}
            />
            <SubmitButton
              onClick={this.onSubmitMessage}
            />
          </div>
        </footer>
      ) : null
    );
  }
}

MessageArea.propTypes = {
  addMessageToGroup: PropTypes.func.isRequired,
  dashboardIsActive: PropTypes.bool.isRequired
};

export default MessageArea;
