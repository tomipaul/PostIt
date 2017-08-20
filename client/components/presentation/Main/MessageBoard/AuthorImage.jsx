import React from 'react';
import PropTypes from 'prop-types';

const AuthorImage = ({ AuthorImageLink }) =>
  (
    <div className="author-image">
      <img
        className="circle"
        src={AuthorImageLink}
        alt="initials"
      />
    </div>
  );

AuthorImage.propTypes = {
  AuthorImageLink: PropTypes.string
};

AuthorImage.defaultProps = {
  AuthorImageLink: '../images/female-avatar.png'
};
export default AuthorImage;
