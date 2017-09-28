import React from 'react';
import { shallow } from 'enzyme';
import Messagebox from
'../../components/presentation/Main/MessageBoard/MessageBox';
import { savedMessage } from '../__mocks__/dummyData';

const setup = () => {
  const props = { message: savedMessage };
  const enzymeWrapper = shallow(<Messagebox {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Given MessageBox component is mounted', () => {
    const { enzymeWrapper } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('.message-box').exists()).toBe(true);
      expect(enzymeWrapper.find('AuthorImage').exists()).toBe(true);
    });
  });
});
