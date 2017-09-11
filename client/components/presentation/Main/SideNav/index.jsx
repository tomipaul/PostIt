import React from 'react';
import PropTypes from 'prop-types';
import UserView from './UserView';
import GroupAdd from './CreateGroup';
import Group from './Group';

/**
 * component that displays user image, username and groups
 * @function SideNav
 * @param {object} props
 * @param {string} props.imageLink image URL of signed-in user
 * @param {string} props.username username of signed-in user
 * @param {object} props.groups groups of the signed-in user
 * @param {object.array} props.unreadMessages an object that maps
 * group Id to array of unread messages
 * @return {object} component
 */
const SideNav = ({
  imageLink,
  username = '',
  groups = {},
  unreadMessages = {},
  exploreGroup
}) =>
  (
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
          Object.keys(groups).map((groupId) => {
            const group = groups[groupId];
            return (
              <Group
                key={group.id}
                groupName={group.name}
                unreadCount={(unreadMessages[group.id]) ?
                  unreadMessages[group.id].length : 0
                }
                onClick={() => { exploreGroup(group.id); }}
              />
            );
          }
          )
      }
    </ul>
  );

SideNav.propTypes = {
  imageLink: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  groups: PropTypes.objectOf(
    PropTypes.object
  ).isRequired,
  unreadMessages: PropTypes.objectOf(PropTypes.array).isRequired,
  exploreGroup: PropTypes.func.isRequired
};

export default SideNav;
