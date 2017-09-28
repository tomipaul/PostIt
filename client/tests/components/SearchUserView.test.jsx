import React from 'react';
import { mount } from 'enzyme';
import SearchUserView from
'../../components/presentation/Main/UsersView/SearchUserView.jsx';
import { state } from '../__mocks__/dummyData';

const setup = () => {
  const props = {
    groupMembers: [],
    allUsers: state.users,
    getUser: jest.fn(),
    clearSelectedUser: jest.fn(),
    addUserToGroup: jest.fn(),
    group: state.activeGroup
  };
  const enzymeWrapper = mount(<SearchUserView {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Given SearchUserView component is mounted', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('SearchBox').exists()).toBe(true);
      expect(enzymeWrapper.find('MemberListView').exists()).toBe(true);
    });

    it('should clear selected user', () => {
      expect(props.clearSelectedUser.mock.calls.length).toBe(1);
    });

    it('should have state with keys searchString and matchedUsers', () => {
      expect(enzymeWrapper.state('searchString')).toBe('');
      expect(enzymeWrapper.state('matchedUsers')).toEqual([]);
    });

    it('should call prop getUser when search button is clicked', () => {
      enzymeWrapper.find('.fa-search').simulate('click');
      expect(props.getUser.mock.calls.length).toBe(1);
    });

    it('should call prop getUser when enter key is pressed', () => {
      enzymeWrapper.find('#search-user')
      .simulate('keypress', { key: 'Enter' });
      expect(props.getUser.mock.calls.length).toBe(2);
    });

    it('should not call prop getUser when any other key is pressed', () => {
      enzymeWrapper.find('#search-user').simulate('keypress');
      expect(props.getUser.mock.calls.length).toBe(2);
    });

    it('should handle change event on search input field', () => {
      enzymeWrapper.find('#search-user')
      .simulate('change', { target: { value: undefined } });
      expect(enzymeWrapper.state('searchString')).toBe(undefined);
      expect(enzymeWrapper.state('matchedUsers')).toHaveLength(0);

      enzymeWrapper.find('#search-user')
      .simulate('change', { target: { value: 'em' } });
      expect(enzymeWrapper.state('searchString')).toBe('em');
      expect(enzymeWrapper.state('matchedUsers')).toHaveLength(1);
    });

    it('should not include users who are already group members in search',
    () => {
      enzymeWrapper.setProps({
        groupMembers: [state.users[0]]
      });
      enzymeWrapper.find('#search-user')
      .simulate('change', { target: { value: 'to' } });
      expect(enzymeWrapper.state('searchString')).toBe('to');
      expect(enzymeWrapper.state('matchedUsers')).toHaveLength(0);
    });

    it('should reset state and clear input fields when active group changes',
    () => {
      enzymeWrapper.setProps({
        groupMembers: []
      });
      enzymeWrapper.find('#search-user')
      .simulate('change', { target: { value: 'to' } });
      expect(enzymeWrapper.state('searchString')).toBe('to');
      expect(enzymeWrapper.state('matchedUsers')).toHaveLength(1);
      enzymeWrapper.setProps({
        group: 'second'
      });
      expect(enzymeWrapper.state('searchString')).toBe('');
      expect(enzymeWrapper.state('matchedUsers')).toEqual([]);
    });
  });
});
