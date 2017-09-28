import React from 'react';
import { mount } from 'enzyme';
import Authentication from
'../../components/presentation/Authentication';

jest.mock('react-router-dom');
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
  describe('Authentication component', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('.form-div').exists()).toBe(true);
    });

    it('should have state with key userAccess', () => {
      expect(enzymeWrapper.state('userAccess')).toBe(true);
    });

    it('should render SignUp when userAccess is false', () => {
      enzymeWrapper.find('SignIn').props().showSignup();
      expect(enzymeWrapper.find('SignUp').exists()).toBe(true);
      expect(enzymeWrapper.find('SignIn').exists()).toBe(false);
    });

    it('should render SignIn when userAccess is true', () => {
      enzymeWrapper.find('SignUp').props().showLogin();
      expect(enzymeWrapper.find('SignIn').exists()).toBe(true);
      expect(enzymeWrapper.find('SignUp').exists()).toBe(false);
    });

    it('should call signInUser to sign in a user', () => {
      const SignIn = enzymeWrapper.find('SignIn');
      SignIn.props().onSubmit();
      expect(props.signInUser.mock.calls.length).toBe(1);
    });

    it('should call signUpUser to sign up a user', () => {
      enzymeWrapper.find('SignIn').props().showSignup();
      const SignUp = enzymeWrapper.find('SignUp');
      SignUp.props().onSubmit();
      expect(props.signUpUser.mock.calls.length).toBe(1);
    });
  });
});
