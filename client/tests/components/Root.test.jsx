import React from 'react';
import { mount } from 'enzyme';
import localStorageMock from '../__mocks__/localStorage';
import Root from
'../../components/container/Root';

window.localStorage = localStorageMock;
const setup = () => {
  const enzymeWrapper = mount(<Root />);
  return {
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Root component', () => {
    const { enzymeWrapper } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('Provider').exists()).toBe(true);
      expect(enzymeWrapper.find('BrowserRouter').exists()).toBe(true);
      expect(enzymeWrapper.find('Routes').exists()).toBe(true);
      expect(enzymeWrapper.find('Notifs').exists()).toBe(true);
    });
  });
});
