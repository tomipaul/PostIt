import React from 'react';

const GroupAdd = () => {
  $(document).ready(() => {
    $('.modal').modal();
  });
  return (
    <a
      className="btn-floating btn-large waves-effect waves-light modal-trigger group-add"
      role="button"
      href="#modal1"
      tabIndex="-1"
    >
      <i className="material-icons">add</i>
    </a>
  );
};

export default GroupAdd;
