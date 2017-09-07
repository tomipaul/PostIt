import React from 'react';
import { mount } from 'enzyme';
import Preloader from
'../../components/presentation/Common/Preloader';

const setup = () => {
  const props = {
    requestCount: 0,
    id: '1'
  };
  const enzymeWrapper = mount(<Preloader {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Dialog component', () => {
    const { enzymeWrapper } = setup();
    it('should render self', () => {
      expect(enzymeWrapper.exists()).toBe(true);
    });

    it('should not render subcomponent if requestCount prop is 0',
    () => {
      expect(enzymeWrapper.find('.progress').exists()).toBe(false);
    });

    it(`should render subcomponents if requestCount prop is
    greater than 0`,
    () => {
      enzymeWrapper.setProps({ requestCount: 1 });
      expect(enzymeWrapper.find('.progress').exists()).toBe(true);
      expect(enzymeWrapper.find('.indeterminate').exists()).toBe(true);
    });
  });
});

