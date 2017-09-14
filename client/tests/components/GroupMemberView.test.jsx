import React from 'react';
import { mount } from 'enzyme';
import GroupMemberView from
'../../components/presentation/Main/UsersView/GroupMemberView';
import { state } from '../__mocks__/dummyData';

const setup = () => {
  const props = {
    user: state.auth.user,
    users: state.users,
    selectUser: jest.fn()
  };
  const enzymeWrapper = mount(<GroupMemberView {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Given GroupMember component is mounted', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self', () => {
      expect(enzymeWrapper.exists()).toBe(true);
    });

    it('should have state with keys profileView and listView', () => {
      expect(enzymeWrapper.state('profileView')).toBe(false);
      expect(enzymeWrapper.state('listView')).toBe(true);
    });

    it('should show profile view when profileView is true', () => {
      enzymeWrapper.instance().showProfileView();
      expect(props.selectUser.mock.calls.length).toBe(1);
      expect(enzymeWrapper.state('profileView')).toBe(true);
      expect(enzymeWrapper.state('listView')).toBe(false);
      expect(enzymeWrapper.find('.back').exists()).toBe(true);
      expect(enzymeWrapper.find('UserProfileView').exists()).toBe(true);
    });

    it('should render MemberListView when listView is true', () => {
      enzymeWrapper.instance().showListView();
      expect(enzymeWrapper.find('MemberListView').exists()).toBe(true);
      expect(enzymeWrapper.state('profileView')).toBe(false);
      expect(enzymeWrapper.state('listView')).toBe(true);
    });

    it('should render null when listView and profileView is false', () => {
      enzymeWrapper.setState({
        listView: false,
        profileView: false
      });
      expect(enzymeWrapper.state('profileView')).toBe(false);
      expect(enzymeWrapper.state('listView')).toBe(false);
      expect(enzymeWrapper.find('MemberListView').exists()).toBe(false);
      expect(enzymeWrapper.find('UserProfileView').exists()).toBe(false);
    });
  });
});

