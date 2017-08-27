import React from 'react';
import ReactTooltip from 'react-tooltip';

const GroupAdd = () => {
  $(document).ready(() => {
    $('.modal').modal();
  });
  return (
    <div>
      <a
        className="btn-floating btn-large waves-effect waves-light modal-trigger group-add"
        role="button"
        data-tip="Add group"
        href="#modal1"
        tabIndex="-1"
      >
        <i className="material-icons">add</i>
      </a>
      <ReactTooltip place="left" type="dark" effect="float" />
    </div>
  );
};

export default GroupAdd;
