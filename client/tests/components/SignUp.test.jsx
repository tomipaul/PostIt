import React from 'react';
import { mount } from 'enzyme';
import SignUp from
'../../components/presentation/Authentication/SignUp';

const setup = () => {
  const props = {
    onSubmit: jest.fn(),
    showLogin: jest.fn()
  };
  const enzymeWrapper = mount(<SignUp {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('SignUp component', () => {
    const { enzymeWrapper, props } = setup();
    it('should render a form with four input fields', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('form').exists()).toBe(true);
      expect(enzymeWrapper.find('input')).toHaveLength(4);
      expect(enzymeWrapper.find('#username').exists()).toBe(true);
      expect(enzymeWrapper.find('#email').exists()).toBe(true);
      expect(enzymeWrapper.find('#phone-no').exists()).toBe(true);
      expect(enzymeWrapper.find('#pwd').exists()).toBe(true);
    });

    it('should have a state that is initialised as an empty object',
    () => {
      expect(enzymeWrapper.state()).toEqual({});
    });

    it('should set state when input value is changed ', () => {
      enzymeWrapper.find('#email').simulate('change', {
        target: { name: 'email', value: 'tomi@gmail.com' }
      });
      expect(enzymeWrapper.state('email')).toBe('tomi@gmail.com');
      enzymeWrapper.find('#phone-no').simulate('change', {
        target: { name: 'phoneNo', value: '123456' }
      });
      expect(enzymeWrapper.state('phoneNo')).toBe('123456');
    });

    it('should call onSubmit when submit button is clicked', () => {
      enzymeWrapper.find('.btn').simulate('click');
      expect(props.onSubmit.mock.calls.length).toBe(1);
    });

    it('should call showLogin when the login link is clicked',
    () => {
      enzymeWrapper.find('#go-to-login').simulate('click');
      expect(props.showLogin.mock.calls.length).toBe(1);
    });
  });
});

