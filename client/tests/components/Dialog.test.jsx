import React from 'react';
import { mount } from 'enzyme';
import Dialog from
'../../components/presentation/Common/Dialog';

const setup = () => {
  const props = {
    id: 1,
    kind: 'info',
    message: null,
    dispatch: jest.fn()
  };
  const enzymeWrapper = mount(<Dialog {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Dialog component', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self', () => {
      expect(enzymeWrapper.exists()).toBe(true);
    });

    it('should not render subcomponent if message prop is falsy',
    () => {
      expect(enzymeWrapper.find('.error-dialog').exists()).toBe(false);
    });

    it('should render subcomponent if message prop is truthy',
    () => {
      enzymeWrapper.setProps({ message: 'message' });
      expect(enzymeWrapper.find('.error-dialog').exists()).toBe(true);
    });

    it('should call dispatch when close button is clicked ', () => {
      enzymeWrapper.find('.fa-times-circle').simulate('click');
      expect(props.dispatch.mock.calls.length).toBe(1);
    });
  });
});

