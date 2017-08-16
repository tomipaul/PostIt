import React from 'react';
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
          className="fa fa-sign-out fa-2x tooltipped"
          role="button"
          tabIndex="0"
          data-position="top"
          data-delay="10"
          data-tooltip="logout"
          onClick={logOut}
        />
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
