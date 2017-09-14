import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import 'materialize-css/dist/js/materialize';
import localStorageMock from '../__mocks__/localStorage';
import Routes from '../../components/container/Routes';
import { state } from '../__mocks__/dummyData';
import configureStore from '../../store/configureStore';

window.localStorage = localStorageMock;
const store = configureStore(state);
const history = createBrowserHistory();

const setup = () => {
  const enzymeWrapper = mount(
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
  return {
    enzymeWrapper
  };
};

describe('components', () => {
  describe('Routes component', () => {
    const { enzymeWrapper } = setup();
    it('should render self and subcomponents', () => {
      expect(enzymeWrapper.find('Routes').exists()).toBe(true);
      expect(enzymeWrapper.find('Switch').exists()).toBe(true);
      expect(enzymeWrapper.find('Route').exists()).toBe(true);
    });
  });

  describe('Given Routes component is mounted', () => {
    const { enzymeWrapper } = setup();
    describe('When user navigates to /', () => {
      it('should render AuthenticationPage if token is not set', () => {
        expect(enzymeWrapper.find('AuthenticationPage').exists()).toBe(true);
      });

      it(`should redirect to Dashboard if token is set and 
      isAuthenticated is true`, () => {
        window.localStorage.setItem('auth_token', true);
        history.push('/');
        expect(enzymeWrapper.find('Dashboard')
        .exists()).toBe(true);
        expect(enzymeWrapper.find('AuthenticationPage')
        .exists()).toBe(false);
      });
    });
  });

  describe('Given Routes component is mounted', () => {
    const { enzymeWrapper } = setup();
    describe('When user navigates to /dashboard', () => {
      it(`should render Dashboard if token is set and
      isAuthenticated is true`, () => {
        window.localStorage.setItem('auth_token', true);
        history.push('/dashboard');
        expect(enzymeWrapper.find('Dashboard')
        .exists()).toBe(true);
        expect(enzymeWrapper.find('AuthenticationPage')
        .exists()).toBe(false);
      });

      it(`should call validateUserToken and render preloader 
      if token is set but isAuthenticated is false`, () => {
        store.dispatch({
          type: 'LOG_OUT_SUCCESS'
        });
        history.push('/dashboard');
        expect(enzymeWrapper.find('Dashboard')
        .exists()).toBe(false);
        expect(enzymeWrapper.find('AuthenticationPage')
        .exists()).toBe(false);
        expect(enzymeWrapper.find('.before-auth')
        .exists()).toBe(true);
        expect(enzymeWrapper.find('PreloaderIcon')
        .exists()).toBe(true);
      });

      it('should redirect to AuthenticationPage if token is not set',
      () => {
        window.localStorage.clear();
        history.push('/dashboard');
        expect(enzymeWrapper.find('AuthenticationPage')
        .exists()).toBe(true);
      });
    });
  });
});
