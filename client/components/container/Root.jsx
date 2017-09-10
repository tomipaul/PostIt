import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Notifs } from 'redux-notifications';
import configureStore from '../../store/configureStore';
import Dialog from '../presentation/Common/Dialog';
import Routes from './Routes';

const store = configureStore();
const Root = () =>
  (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Notifs CustomComponent={Dialog} />
      </div>
    </Provider>
  );

export default Root;
