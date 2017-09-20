import React from 'react';
import { mount } from 'enzyme';
import UsersView from
'../../components/presentation/Main/UsersView';
import { state } from '../__mocks__/dummyData';

const setup = () => {
  const props = {
    user: state.auth.user,
    users: state.users,
    allUsers: state.users,
    activeGroup: state.activeGroup,
    selectUser: jest.fn(),
    getUser: jest.fn(),
    clearSelectedUser: jest.fn(),
    showSearchUserView: false,
    showGroupMemberView: false,
    hideRightBar: jest.fn(),
    addUserToGroup: jest.fn()
  };
  const enzymeWrapper = mount(<UsersView {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Given UsersView component is mounted', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('.right-bar').exists()).toBe(true);
    });

    it('should have an empty state', () => {
      expect(enzymeWrapper.state()).toEqual({});
    });

    it(`should render null when showSearchUserView and 
    showGroupMemberView is false`, () => {
      expect(enzymeWrapper.find('SearchUserView').exists()).toBe(false);
      expect(enzymeWrapper.find('GroupMemberView').exists()).toBe(false);
    });

    it('should render SearchUserView when showSearchUserView is true',
    () => {
      enzymeWrapper.setProps({
        showSearchUserView: true,
        showGroupMemberView: false
      });
      expect(enzymeWrapper.find('SearchUserView').exists()).toBe(true);
      expect(enzymeWrapper.find('GroupMemberView').exists()).toBe(false);
    });

    it('should render GroupMemberView when GroupMemberView is true', () => {
      enzymeWrapper.setProps({
        showSearchUserView: false,
        showGroupMemberView: true
      });
      expect(enzymeWrapper.find('GroupMemberView').exists()).toBe(true);
      expect(enzymeWrapper.find('SearchUserView').exists()).toBe(false);
    });

    it('should call addUserToGroup prop when adding user to group', () => {
      enzymeWrapper.instance().addUserToGroup(state.auth.user);
      expect(props.addUserToGroup.mock.calls.length).toBe(1);
    });
  });
});
