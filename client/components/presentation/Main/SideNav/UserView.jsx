import React from 'react';
import PropTypes from 'prop-types';


/**
 * display a user's image and username
 * @function UserView
 * @param {object} props
 * @param {string} imageLink
 * @param {string} username
 * @return {object} UserView component
 */
const UserView = ({ imageLink, username }) =>
  (
    <li>
      <div className="user-view">
        <a
          className="modal-trigger"
          role="button"
          href="#user1"
          tabIndex="-1"
        >
          <img className="circle" src={imageLink} alt={username} />
        </a>
        <a href="#!name">
          <span className="white-text name">{username}</span>
        </a>
      </div>
    </li>
  );

UserView.propTypes = {
  imageLink: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default UserView;
