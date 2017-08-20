import React from 'react';
import PropTypes from 'prop-types';

const AuthorImage = ({ AuthorImageLink }) =>
  (
    <div className="author-image">
      <img
        className="circle"
        src={
          AuthorImageLink ||
          '/images/silhouette.jpeg'
        }
        alt=""
      />
    </div>
  );

AuthorImage.propTypes = {
  AuthorImageLink: PropTypes.string.isRequired
};

export default AuthorImage;
