import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux'
import store from './redux'

import './index.css';
import App from './App';

import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNHgwpwUjLwDGSPq9wWZSw6HVjvyvQcIQ",
  authDomain: "hotel-project-9adee.firebaseapp.com",
  databaseURL: "https://hotel-project-9adee-default-rtdb.firebaseio.com",
  projectId: "hotel-project-9adee",
  storageBucket: "hotel-project-9adee.appspot.com",
  messagingSenderId: "675260551983",
  appId: "1:675260551983:web:2fc54e754be88faf41c7da"
};

const app = initializeApp(firebaseConfig);


const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Provider store={store}>, <App tab="home" /></Provider> );
