import React from 'react';
import { mount } from 'enzyme';
import Header from
'../../components/presentation/Header';

const setup = () => {
  const props = {
    isDashboard: false,
    logOut: jest.fn()
  };
  const enzymeWrapper = mount(<Header {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Header component', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self', () => {
      expect(enzymeWrapper.exists()).toBe(true);
    });

    it('should render subcomponents when isDashboard is false', () => {
      expect(enzymeWrapper.find('.header-home').exists()).toBe(true);
      expect(enzymeWrapper.find('img').exists()).toBe(true);
    });

    it('should render subcomponents when isDashboard is true', () => {
      enzymeWrapper.setProps({ isDashboard: true });
      expect(enzymeWrapper.find('.header-dashboard').exists()).toBe(true);
      expect(enzymeWrapper.find('.header-flex').exists()).toBe(true);
      expect(enzymeWrapper.find('.fa-bars').exists()).toBe(true);
      expect(enzymeWrapper.find('.fa-bars')
      .hasClass('button-collapse')).toBe(true);
      expect(enzymeWrapper.find('.fa-sign-out').exists()).toBe(true);
      expect(enzymeWrapper.find('img').exists()).toBe(true);
      expect(enzymeWrapper.find('ReactTooltip').exists()).toBe(true);
    });

    it('should call logOut when log out is clicked', () => {
      enzymeWrapper.find('.fa-sign-out').simulate('click');
      expect(props.logOut.mock.calls.length).toBe(1);
    });
  });
});
