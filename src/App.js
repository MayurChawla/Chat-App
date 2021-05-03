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

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section>
        {user?<ChatRoom/>:<SignIn/>}
      </section>
    </div>
  );
}

  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
    return(
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
  }

  function SignOut() {
    return auth.currentUser && (
      <button onClick={()=>auth.SignOut()}>Sign Out</button>
    )
  }

  function ChatRoom() {
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query,{idField: 'id'});

    return(
      <>
        {messages && messages.map(msg=><ChatMessage key={msg.id} message={msg}/>)}
      </>
    )

  }

  function ChatMessage(props) {
    const {text, uid} = props.message;
    return <p>{text}</p>
  }

export default App;
