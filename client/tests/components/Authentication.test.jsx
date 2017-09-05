import React from 'react';
import { mount } from 'enzyme';
import Authentication from
'../../components/presentation/Authentication/Index.jsx';

const setup = () => {
  const props = {
    signInUser: jest.fn(),
    signUpUser: jest.fn()
  };

  const enzymeWrapper = mount(<Authentication {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Authentication', () => {
    const { enzymeWrapper } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('.form-div').exists()).toBe(true);
    });
    it('should have state with keys showLogin and showSignup', () => {
      expect(enzymeWrapper.state('showLogin')).toBe(true);
      expect(enzymeWrapper.state('showSignup')).toBe(false);
    });
    it('should render SignUp when showSignup is true', () => {
      enzymeWrapper.find('SignIn').props().showSignup();
      expect(enzymeWrapper.find('SignUp').exists()).toBe(true);
      expect(enzymeWrapper.find('SignIn').exists()).toBe(false);
    });
    it('should render SignIn when showLogin is true', () => {
      enzymeWrapper.find('SignUp').props().showLogin();
      expect(enzymeWrapper.find('SignIn').exists()).toBe(true);
      expect(enzymeWrapper.find('SignUp').exists()).toBe(false);
    });
  });
});
