import React from 'react';
import PropTypes from 'prop-types';
import Priority from './Priority.jsx';

const PrioritySelect = ({ priorityWasSelected }) => {
  return (
    <div className="select-priority-2 col s2">
      {
        ['normal', 'urgent', 'critical'].map((priorityType) => {
          return (
            <Priority
              key={priorityType}
              priorityType={priorityType}
              onClick={priorityWasSelected}
            />
          );
        })
      }
    </div>
  );
};

PrioritySelect.propTypes = {
  priorityWasSelected: PropTypes.func.isRequired,
};

export default PrioritySelect;
