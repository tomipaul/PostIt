import React from 'react';
import { mount } from 'enzyme';
import Priority from
'../../components/presentation/MessageArea/Priority';

const setup = () => {
  const props = {
    priorityType: 'normal',
    onClick: jest.fn(),
    selected: false
  };
  const enzymeWrapper = mount(<Priority {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Given Priority component is mounted', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('span.label').exists()).toBe(true);
    });

    it('should display priority type as text in the component', () => {
      expect(enzymeWrapper.find('span.label').text()).toEqual('normal');
    });

    it('should call prop onClick when the component is clicked', () => {
      enzymeWrapper.find('.label').simulate('click');
      expect(props.onClick.mock.calls.length).toBe(1);
    });
  });
});
