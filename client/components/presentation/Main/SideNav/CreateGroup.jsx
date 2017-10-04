import React from 'react';
import ReactTooltip from 'react-tooltip';

/**
 * create a group button
 * @function CreateGroup
 * @return {object} CreateGroup component
 */
const CreateGroup = () => {
  $(document).ready(() => {
    $('.modal').modal();
  });
  return (
    <div>
      <a
        className="btn-floating btn-large waves-effect waves-light modal-trigger group-add"
        role="button"
        data-tip="Add group"
        href="#create_group_modal"
        tabIndex="-1"
      >
        <i className="material-icons">add</i>
      </a>
      <ReactTooltip place="left" type="dark" effect="float" />
    </div>
  );
};

export default CreateGroup;
