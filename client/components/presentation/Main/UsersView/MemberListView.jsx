import React from 'react';
import PropTypes from 'prop-types';
import UserView from './UserView';

/**
 * display component that shows all members of a group
 * @param {object} props
 * @param {array} props.users
 * @param {function} props.selectUser
 * @returns {object} MemberListview component
 */
const MemberListView = ({ users, selectUser, isSearchUserView }) =>
  (
    <div>
      {
        (users) ? (users.map(user =>
          (
            <UserView
              key={user.username}
              user={user}
              selectUser={selectUser}
              isSearchUserView={isSearchUserView}
            />
          )
        )) : null
      }
    </div>
  );

MemberListView.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectUser: PropTypes.func.isRequired,
  isSearchUserView: PropTypes.bool
};

MemberListView.defaultProps = {
  isSearchUserView: false
};

export default MemberListView;
