import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import MessageBoard from
'../../components/presentation/Main/MessageBoard';
import localStorageMock from '../__mocks__/localStorage';
import { state, messages } from '../__mocks__/dummyData';
import configureStore from '../../store/configureStore';

window.localStorage = localStorageMock;
const store = configureStore(state);

const setup = () => {
  const props = {
    messages,
    nodeRef: jest.fn(),
    onScroll: jest.fn()
  };
  const enzymeWrapper = mount(
    <Provider store={store}>
      <MessageBoard {...props} />
    </Provider>
  );
  return {
    props,
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Given MessageBoard component is mounted', () => {
    const { enzymeWrapper, props } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.exists()).toBe(true);
      expect(enzymeWrapper.find('.message-board').exists()).toBe(true);
      expect(enzymeWrapper.find('MessageBox')).toHaveLength(2);
    });

    it('should call prop onScroll when message board is scrolled', () => {
      enzymeWrapper.find('.message-board').simulate('scroll');
      expect(props.onScroll.mock.calls.length).toBe(1);
    });
  });
});
