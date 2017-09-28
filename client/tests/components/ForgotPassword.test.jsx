import React from 'react';
import { mount } from 'enzyme';
import { ForgotPassword } from
'../../components/presentation/ForgotPassword';

jest.mock('react-router-dom');
const setup = () => {
  const props = {
    sendPasswordResetMail: jest.fn(),
    notifError: {}
  };
  const enzymeWrapper = mount(<ForgotPassword {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Given ForgotPassword component is mounted', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('.auth-container-board')
      .exists()).toBe(true);
      expect(enzymeWrapper.find('.header-home').exists()).toBe(true);
      expect(enzymeWrapper.find('.auth-form').exists()).toBe(true);
      expect(enzymeWrapper.find('.input-field').exists()).toBe(true);
    });

    it('should have state with key showPreloader', () => {
      expect(enzymeWrapper.state('showPreloader')).toBe(false);
    });

    it("should render subcomponent if there's a notification message",
    () => {
      enzymeWrapper.setProps({
        notifError: {
          kind: 'danger',
          message: 'This is danger'
        }
      });
      expect(enzymeWrapper.find('p').exists()).toBe(true);
    });

    it(`should render subcomponent with red text if 
    notification message is an error`, () => {
      const paragraph = enzymeWrapper.find('p');
      expect(paragraph.prop('style'))
      .toHaveProperty('color', 'red');
      expect(paragraph.prop('style'))
      .toHaveProperty('fontSize', '12px');
      expect(paragraph.text()).toEqual('*This is danger');
    });

    it(`render subcomponent with green text if 
    notification message is success`, () => {
      enzymeWrapper.setProps({
        notifError: {
          kind: 'success',
          message: 'This is success'
        }
      });
      const paragraph = enzymeWrapper.find('p');
      expect(paragraph.prop('style'))
      .toHaveProperty('color', 'green');
      expect(paragraph.prop('style'))
      .toHaveProperty('fontSize', '12px');
      expect(paragraph.text()).toEqual('*This is success');
    });

    it('should not render preloader if state.showPreloader is false',
    () => {
      expect(enzymeWrapper.find('PreloaderIcon').exists()).toBe(false);
    });

    it('should set state when email input changes', () => {
      enzymeWrapper.find('#email').simulate('change', {
        target: {
          name: 'email',
          value: 'new@email.com'
        }
      });
      expect(enzymeWrapper.state('email')).toEqual('new@email.com');
    });

    it('should call sendPasswordResetMail on submit and show preloader',
    () => {
      const SubmitButton = enzymeWrapper.find('a.btn');
      SubmitButton.simulate('click');
      expect(props.sendPasswordResetMail.mock.calls.length).toBe(1);
      expect(enzymeWrapper.state('showPreloader')).toBe(true);
    });
  });
});
