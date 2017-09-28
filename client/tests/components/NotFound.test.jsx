import React from 'react';
import { mount } from 'enzyme';
import { NotFound } from
'../../components/presentation/Common/NotFound';

const setup = () => {
  const props = {
    isAuthenticated: false
  };
  const enzymeWrapper = mount(<NotFound {...props} />);
  return {
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Given NotFound component is mounted', () => {
    const { enzymeWrapper } = setup();
    it('should render self and subcomponent', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('.error-404').exists()).toBe(true);
    });

    it(`should render a button that user can click
    to go back into the app`, () => {
      expect(enzymeWrapper.find('a').exists()).toBe(true);
    });

    it(`should have button text "Back to Dashboard"
    if user is authenticated`, () => {
      enzymeWrapper.setProps({ isAuthenticated: true });
      expect(enzymeWrapper.find('a').text())
      .toEqual('Back to Dashboard');
    });

    it(`should have button text "Back to Homepage"
    if user is not authenticated`, () => {
      enzymeWrapper.setProps({ isAuthenticated: false });
      expect(enzymeWrapper.find('a').text())
      .toEqual('Back to Homepage');
    });
  });
});
