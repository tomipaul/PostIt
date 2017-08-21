import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
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
   * set initial MessageArea state for a selected group
   * @method componentWillReceiveProps
   * @param {object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const newActiveGroup = nextProps.activeGroup;
    if (newActiveGroup &&
    !this.state[newActiveGroup]) {
      this.setState({
        [newActiveGroup]: {
          text: '',
          priority: 'normal'
        }
      });
    }
  }

  /**
   * event handler: submit message
   * @method onSubmitMessage
   * @param {object} event
   * @returns {void}
   */
  onSubmitMessage() {
    const { activeGroup } = this.props;
    const { text, priority } = this.state[activeGroup];
    this.props.addMessageToGroup({
      text: marked(text),
      priority
    });
    this.setState({
      [activeGroup]: {
        text: '',
        priority: 'normal'
      }
    });
  }

  /**
   * event handler: set local state when text in TextBox changes
   * @method onMessageChange
   * @param {object} event
   * @returns {void}
   */
  onMessageChange(event) {
    event.preventDefault();
    const { activeGroup } = this.props;
    this.setState({
      [activeGroup]: {
        ...this.state[activeGroup],
        text: event.target.value
      }
    });
  }

  /**
   * event handler: set local state when message priority is selected
   * @method onPrioritySelect
   * @param {object} event
   * @returns {void}
   */
  onPrioritySelect(event) {
    event.preventDefault();
    const { activeGroup } = this.props;
    this.setState({
      [activeGroup]: {
        ...this.state[activeGroup],
        priority: event.target.getAttribute('data-priority')
      }
    });
  }

  /**
   * render component
   * @method render
   * @returns {object} component
   */
  render() {
    const { activeGroup } = this.props;
    return (
      (activeGroup) ?
      (
        <footer>
          <div className="message-input row">
            <TextBox
              message={this.state[activeGroup].text}
              changeMessage={this.onMessageChange}
              onSubmitMessage={this.onSubmitMessage}
            />
            <PrioritySelect
              selectPriority={this.onPrioritySelect}
              activePriority={
                this.state[activeGroup].priority || 'normal'
              }
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
  activeGroup: PropTypes.string.isRequired
};

export default MessageArea;
