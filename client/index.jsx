import React from 'react';
import { render } from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'redux-notifications/lib/styles.css';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.min.css';
import './bin/css/signup-login.css';
import './bin/css/board.css';
import Root from './components/container/Root';

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};
firebase.initializeApp(config);
render(
  <Root />,
  document.getElementById('root')
);
