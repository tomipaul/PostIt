import React from 'react';
import PropTypes from 'prop-types';

const Priority = ({ priorityType, onClick }) => {
  $(document).ready(() => {
    $('.label').click((e) => {
      $('.label').removeAttr('data-priority');
      const message = e.target;
      const priority = message.textContent;
      message.setAttribute('data-priority', priority);
    });
  });

  return (
    <span
      className="label"
      role="switch"
      aria-checked="false"
      tabIndex="-1"
      data-priority={
        (priorityType === 'normal') ?
        priorityType : null
      }
      onClick={onClick}
    >{priorityType}
    </span>
  );
};

Priority.propTypes = {
  priorityType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Priority;
