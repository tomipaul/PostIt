import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({
  onChange,
  onKeyPress,
  onClick
}) =>
  (
    <div className="input-field">
      <input
        className="browser-default"
        id="search-user"
        type="text"
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder="Enter username"
      />
      <i
        className="fa fa-search prefix"
        role="button"
        tabIndex="-1"
        onClick={onClick}
      />
    </div>
  );

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired
};

export default SearchBox;
