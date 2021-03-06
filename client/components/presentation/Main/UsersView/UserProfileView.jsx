import React from 'react';
import PropTypes from 'prop-types';

/**
 * display a user's profile
 * @function UserProfileView
 * @param {object} props
 * @param {object} props.user
 * @return {object} UserProfileView component
 */
const UserProfileView = ({ user }) =>
  (
    <div className="user-profile">
      <img
        className="profile-photo"
        src={user.photoURL || '/images/silhouette.jpeg'}
        alt={user.username}
      />
      <div>
        <div className="info z-depth-1">
          <span>Username |</span> {user.username}
        </div>
        <div className="info z-depth-1">
          <span>Email |</span> {user.email}
        </div>
        <div className="info z-depth-1">
          <span>PhoneNo |</span> {user.phoneNo}
        </div>
      </div>
    </div>
  );

UserProfileView.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    phoneNo: PropTypes.string,
    status: PropTypes.string
  }).isRequired
};

export default UserProfileView;
