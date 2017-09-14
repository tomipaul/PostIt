import React from 'react';
import { mount } from 'enzyme';
import NotFound from
'../../components/presentation/Common/NotFound';

const setup = () => {
  const enzymeWrapper = mount(<NotFound />);
  return {
    enzymeWrapper
  };
};

describe('components', () => {
  describe('NotFound component', () => {
    const { enzymeWrapper } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('.error-404').exists()).toBe(true);
    });
  });
});
