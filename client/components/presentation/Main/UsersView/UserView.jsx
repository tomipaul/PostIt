import React from 'react';
import PropTypes from 'prop-types';

/**
 * display a user's image and username
 * @function UserView
 * @param {object} props
 * @param {object} props.user
 * @param {function} props.selectUser
 * @return {object} UserView component
 */
const UserView = ({ user, selectUser }) =>
  (
    (Object.keys(user).length) ? (
      <div
        className="z-depth-1 userview-box"
        role="button"
        tabIndex="-1"
        onClick={() => {
          selectUser(user);
        }}
      >
        <img
          className="userview-thumbnail circle"
          src={
            user.photoURL || '/images/silhouette.jpeg'
          }
          alt={user.username}
        />
        <span
          className="userview-username"
        >{user.username}</span>
      </div>
    ) : null
  );

UserView.propTypes = {
  selectUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    username: PropTypes.string
  }).isRequired
};

export default UserView;
