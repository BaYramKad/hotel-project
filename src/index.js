import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { getDatabase, ref, onValue} from "firebase/database";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDNHgwpwUjLwDGSPq9wWZSw6HVjvyvQcIQ",
  authDomain: "hotel-project-9adee.firebaseapp.com",
  databaseURL: "https://hotel-project-9adee-default-rtdb.firebaseio.com",
  projectId: "hotel-project-9adee",
  storageBucket: "hotel-project-9adee.appspot.com",
  messagingSenderId: "675260551983",
  appId: "1:675260551983:web:2fc54e754be88faf41c7da"
};

initializeApp(firebaseConfig);

export const Context = createContext()
const container = document.getElementById('root');
const root = createRoot(container);

const db = getDatabase();
const starCountRef = ref(db);
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  root.render(<Context.Provider value={data}>, <App tab="home" /></Context.Provider> );
});