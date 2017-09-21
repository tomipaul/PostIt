import React from 'react';
import PropTypes from 'prop-types';

/**
 * display input field and search button
 * @function SearchBox
 * @param {object} props
 * @param {function} onChange
 * @param {function} onKeyPress
 * @param {function} onClick
 * @return {object} SerachBox component
 */
const SearchBox = ({
  value,
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
        value={value}
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
  onKeyPress: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SearchBox;
