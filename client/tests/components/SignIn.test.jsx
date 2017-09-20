import React from 'react';
import { mount } from 'enzyme';
import SignIn from
'../../components/presentation/Authentication/SignIn';

jest.mock('react-router-dom');
const setup = () => {
  const props = {
    onSubmit: jest.fn(),
    showSignup: jest.fn()
  };
  const enzymeWrapper = mount(<SignIn {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('SignIn component', () => {
    const { enzymeWrapper, props } = setup();
    it('should render a form with two input fields', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('form').exists()).toBe(true);
      expect(enzymeWrapper.find('input')).toHaveLength(2);
      expect(enzymeWrapper.find('#username').exists()).toBe(true);
      expect(enzymeWrapper.find('#pwd').exists()).toBe(true);
    });

    it('should have a state that is initialised as an empty object',
    () => {
      expect(enzymeWrapper.state()).toEqual({});
    });

    it('should set state when input value is changed ', () => {
      enzymeWrapper.find('#username').simulate('change', {
        target: { name: 'username', value: 'tomipaul' }
      });
      expect(enzymeWrapper.state('username')).toBe('tomipaul');
      enzymeWrapper.find('#pwd').simulate('change', {
        target: { name: 'password', value: '123456' }
      });
      expect(enzymeWrapper.state('password')).toBe('123456');
    });

    it('should call onSubmit when submit button is clicked', () => {
      enzymeWrapper.find('.btn').simulate('click');
      expect(props.onSubmit.mock.calls.length).toBe(1);
    });

    it('should call showSignup when the signup link is clicked',
    () => {
      enzymeWrapper.find('#go-to-signup').simulate('click');
      expect(props.showSignup.mock.calls.length).toBe(1);
    });
  });
});

