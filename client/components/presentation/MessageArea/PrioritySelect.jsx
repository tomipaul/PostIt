import React from 'react';
import PropTypes from 'prop-types';
import Priority from './Priority.jsx';

const PrioritySelect = ({ selectPriority, activePriority }) => (
  <div className="select-priority-2 col s2">
    {
      ['normal', 'urgent', 'critical'].map(priorityType =>
          (<Priority
            key={priorityType}
            priorityType={priorityType}
            onClick={selectPriority}
            selected={activePriority === priorityType}
          />)
        )
      }
  </div>
  );

PrioritySelect.propTypes = {
  selectPriority: PropTypes.func.isRequired,
  activePriority: PropTypes.string.isRequired
};

export default PrioritySelect;
