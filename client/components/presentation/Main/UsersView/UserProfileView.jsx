import React from 'react';
import PropTypes from 'prop-types';

const UserProfileView = ({ user }) =>
  (
    <div className="user-profile">
      <img
        className="profile-photo"
        src={user.photoURL}
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
        <div className="info z-depth-1">
          <span>Status |</span> {user.status}
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
