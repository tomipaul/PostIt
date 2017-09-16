import React from 'react';
import { render } from 'react-dom';
import { initializeApp } from 'firebase';
import 'firebase/storage';
import 'redux-notifications/lib/styles.css';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.min.css';
import './bin/scss/signup-login.scss';
import './bin/scss/board.scss';
import Root from './components/container/Root';

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};
initializeApp(config);
render(
  <Root />,
  document.getElementById('root')
);
