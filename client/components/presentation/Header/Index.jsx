import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

const Header = ({ isDashboard, logOut }) => {
  $('.button-collapse').sideNav({
    closeOnClick: true
  });
  return (isDashboard) ?
  (
    <header className="header-dashboard">
      <div className="header-flex">
        <i
          className="fa fa-bars button-collapse"
          data-activates="slide-out"
        />
        <img
          className="responsive-img"
          src="../images/postit-icon.png"
          alt=""
        />
        <i
          className="fa fa-sign-out fa-2x"
          role="button"
          tabIndex="0"
          data-tip="logout"
          onClick={logOut}
        />
        <ReactTooltip place="top" type="dark" effect="float" />
      </div>
    </header>
  ) : (
    <header className="header-home">
      <img
        className="responsive-img"
        src="../images/postit-icon.png"
        alt=""
      />
    </header>
  );
};

Header.propTypes = {
  isDashboard: PropTypes.bool.isRequired,
  logOut: PropTypes.func
};
Header.defaultProps = {
  logOut: null
};

export default Header;
