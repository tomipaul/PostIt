import React from 'react';
import PropTypes from 'prop-types';

/**
 * display a priority select button
 * @class Priority
 * @extends React.Component
 */
class Priority extends React.Component {
  /**
   * handle click event on priority selection buttons
   * @method ComponentDidMount
   * @returns {void}
   */
  //eslint-disable-next-line
  componentDidMount() {
    $('.label').click((e) => {
      $('.label').removeAttr('data-priority');
      const message = e.target;
      const priority = message.textContent;
      message.setAttribute('data-priority', priority);
    });
  }

  /**
   * render component
   * @method render
   * @returns {object} component
   */
  render() {
    const { priorityType, onClick, selected } = this.props;
    return (
      <span
        className="label"
        role="switch"
        aria-checked="false"
        tabIndex="-1"
        data-priority={
          (selected) ?
          priorityType : null
        }
        onClick={onClick}
      >{priorityType}
      </span>
    );
  }
}

Priority.propTypes = {
  priorityType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};

export default Priority;
