import React from 'react';
import PropTypes from 'prop-types';
import Priority from './Priority.jsx';

const PrioritySelect = ({ selectPriority }) => (
  <div className="select-priority-2 col s2">
    {
        ['normal', 'urgent', 'critical'].map(priorityType =>
            (<Priority
              key={priorityType}
              priorityType={priorityType}
              onClick={selectPriority}
            />)
          )
      }
  </div>
  );

PrioritySelect.propTypes = {
  selectPriority: PropTypes.func.isRequired,
};

export default PrioritySelect;
