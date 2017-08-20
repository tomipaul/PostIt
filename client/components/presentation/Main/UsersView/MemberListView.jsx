import React from 'react';
import PropTypes from 'prop-types';
import UserView from './UserView.jsx';

const MemberListView = ({ users, viewUser }) =>
  (
    <div>
      {
        (users) ? (users.map(user =>
          (<UserView
            key={user.username}
            user={user}
            selectUser={viewUser}
          />)
        )) : null
      }
    </div>
  );

MemberListView.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  viewUser: PropTypes.func.isRequired
};

export default MemberListView;
