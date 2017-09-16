import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';

/**
 * display a user's image and username
 * @function UserView
 * @param {object} props
 * @param {object} props.user
 * @param {function} props.selectUser
 * @return {object} UserView component
 */
const UserView = ({ user, selectUser, isSearchUserView }) => {
  const userViewClass = classNames({
    'search-view': isSearchUserView,
    'member-view': !isSearchUserView,
    'z-depth-1': true,
    'userview-box': true
  });
  return (Object.keys(user).length) ? (
    <div>
      <div
        className={userViewClass}
        role="button"
        tabIndex="-1"
        onClick={() =>
          (
            !isSearchUserView ?
            selectUser(user) : null
          )
        }
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
      <ReactTooltip place="bottom" type="dark" effect="float" />
      {
        isSearchUserView ?
          <i
            className="fa fa-plus-square-o add fa-2x"
            role="button"
            tabIndex="-1"
            data-tip={`Add ${user.username} to group`}
            onClick={() => selectUser(user)}
          />
          : null
      }
    </div>
  ) : null;
};

UserView.propTypes = {
  selectUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    username: PropTypes.string
  }).isRequired,
  isSearchUserView: PropTypes.bool.isRequired
};

export default UserView;
