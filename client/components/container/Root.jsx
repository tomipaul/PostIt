import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../../store/configureStore';
import Routes from './Routes.jsx';

const store = configureStore();
const Root = () =>
  (
    <Provider store={store}>
      <BrowserRouter forceRefresh>
        <Routes />
      </BrowserRouter>
    </Provider>
  );

export default Root;
