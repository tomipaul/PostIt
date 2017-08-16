import React from 'react';
import PropTypes from 'prop-types';
import PrioritySelect from './PrioritySelect.jsx';
import TextBox from './TextBox.jsx';
import SubmitButton from './SubmitButton.jsx';

/**
 * @class Footer
 * @extends React.Component
 */
class Footer extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = { text: '', priority: 'normal' };
    this.messageWasChanged = this.messageWasChanged.bind(this);
    this.priorityWasSelected = this.priorityWasSelected.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  }
  /**
   * event handler: submit message
   * @method onSubmitMessage
   * @param {object} event
   * @returns {void}
   */
  onSubmitMessage() {
    this.props.onClick(this.state);
    this.setState({ text: '', priority: 'normal' });
  }
  /**
   * event handler: set local state when text in TextBox changes
   * @method
   * @param {object} event
   * @returns {void}
   */
  messageWasChanged(event) {
    event.preventDefault();
    this.setState({ text: event.target.value });
  }

  /**
   * event handler: set local state when message priority is selected
   * @method
   * @param {object} event
   * @returns {void}
   */
  priorityWasSelected(event) {
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
              messageWasChanged={this.messageWasChanged}
              onSubmitMessage={this.onSubmitMessage}
            />
            <PrioritySelect
              priorityWasSelected={this.priorityWasSelected}
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

Footer.propTypes = {
  onClick: PropTypes.func.isRequired,
  dashboardIsActive: PropTypes.bool.isRequired
};

export default Footer;
