import React from 'react';
import { mount } from 'enzyme';
import CreateGroupModal from
'../../components/presentation/Modals/CreateGroupModal';

const setup = () => {
  const props = {
    createGroup: jest.fn()
  };
  const enzymeWrapper = mount(<CreateGroupModal {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('CreateGroupModal component', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('#create_group_modal').exists()).toBe(true);
    });

    it('should set state when form input changes', () => {
      enzymeWrapper.find('#group_name').simulate('change', {
        target: {
          name: 'name',
          value: 'New group'
        }
      });
      enzymeWrapper.find('#group_desc').simulate('change', {
        target: {
          name: 'description',
          value: 'This is a new group'
        }
      });
      expect(enzymeWrapper.state('name')).toEqual('New group');
      expect(enzymeWrapper.state('description'))
      .toEqual('This is a new group');
    });

    it('should call createGroup on submit', () => {
      const SubmitButton = enzymeWrapper.find('a.btn-flat');
      SubmitButton.simulate('click');
      expect(props.createGroup.mock.calls.length).toBe(1);
      expect(enzymeWrapper.state('name')).toBe('');
      expect(enzymeWrapper.state('description')).toBe('');
    });
  });
});

