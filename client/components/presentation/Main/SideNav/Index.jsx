import React from 'react';
import PropTypes from 'prop-types';
import UserView from './UserView.jsx';
import GroupAdd from './GroupAdd.jsx';
import Group from './Group.jsx';

const SideNav = ({
  imageLink,
  username,
  groups,
  unreadCountObject,
  exploreGroup
}) => {
  const groupIdArray = Object.keys(groups);
  return (
    <ul id="slide-out" className="side-nav fixed">
      <UserView
        imageLink={imageLink}
        username={username}
      />
      <GroupAdd />
      <li>
        <a className="subheader">GROUPS</a>
      </li>
      {
        (groupIdArray.length !== 0) ?
        (
          groupIdArray.map((groupId) => {
            const group = groups[groupId];
            return (
              <Group
                key={group.id}
                groupName={group.name}
                unreadCount={
                  unreadCountObject[group.name] || 0
                }
                onClick={() => { exploreGroup(group.id); }}
              />
            );
          })
        ) : null
      }
    </ul>
  );
};

SideNav.propTypes = {
  imageLink: PropTypes.string.isRequired,
  username: PropTypes.string,
  groups: PropTypes.objectOf(
    PropTypes.object
  ).isRequired,
  unreadCountObject: PropTypes.objectOf(PropTypes.number),
  exploreGroup: PropTypes.func.isRequired
};

SideNav.defaultProps = {
  username: '',
  unreadCountObject: {},
};

export default SideNav;
