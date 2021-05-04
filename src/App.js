import React, {useState} from 'react';
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
    var [formValue, setFormValue] = useState("");

    const sendMessage = async(e) => {
      e.preventDefault();
      const {uid, photoURL} = auth.currentUser;
      console.log(formValue,uid,photoURL);
      await messagesRef.add({
        
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
      setFormValue('');
    }

    return(
      <>
        <div>
            {messages && messages.map(msg=><ChatMessage key={msg.id} message={msg}/>)}
        </div>
        <form onSubmit={sendMessage}>
            <input onChange={(e) => {
                setFormValue(e.target.Value)
                console.log(e.target.value)
                }} value={formValue} />
            <button type="submit">Go</button>
        </form>
      </>
    )

  }

  function ChatMessage(props) {

    const {text, uid, photoURL} = props.message;
    const messageClass = uid ===auth.currentUser.uid ? 'sent':'received';
    return (
      // <p>{text}</p>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} alt=""></img>
        <p>{text}</p>
      </div>
    )
  }

export default App;
