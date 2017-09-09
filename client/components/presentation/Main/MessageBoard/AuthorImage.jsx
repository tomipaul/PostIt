import React from 'react';
import PropTypes from 'prop-types';

/**
 * display image of the user that posted a message
 * @function AuthorImage
 * @param {object} props
 * @param {string} props.AuthorImageLink photo URL
 * @return {object} Authorimage component
 */
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
