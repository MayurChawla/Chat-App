import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyBiYGfg9oDagFnSri8RmGJRQ9WHhGoQ9lw",
    authDomain: "firechat-d386e.firebaseapp.com",
    projectId: "firechat-d386e",
    storageBucket: "firechat-d386e.appspot.com",
    messagingSenderId: "981451750877",
    appId: "1:981451750877:web:9eb3df9f21eddf13a80a34"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
