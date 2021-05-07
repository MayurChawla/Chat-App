import React, {useState, useRef} from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h2>{user? auth.currentUser.displayName:""}</h2>
      {/* <h1>⚛️🔥💬</h1> */}
        <SignOut />
        
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
      <button onClick={()=>auth.signOut()}>Sign Out</button>
    )
  }

  function ChatRoom() {
    const dummy = useRef();

    const [messageValue, setMessageValue] = useState("");
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');
    //.limit(25)

    const [messages] = useCollectionData(query,{idField: 'id'});

    const sendMessage = async (e) => {
      e.preventDefault();
      const { uid, photoURL } = auth.currentUser;
      await messagesRef.add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        text: messageValue,
        uid,
        photoURL
      });
      setMessageValue('');
      dummy.current.scrollIntoView({ behavior : 'smooth' });
    }

    return(
      <>
        <div>
            <div><h1>dummy</h1><h3>morte space</h3></div>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            <div ref={ dummy }><h1>dummy</h1><h3>morte space</h3></div>
        </div>
        <form onSubmit={sendMessage}>
            <input value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)} placeholder="say something.."/>
            <button type="submit">Go</button>
        </form>
      </>
    )
  }

  function ChatMessage(Prop) {
    
    const { text, uid, photoURL } = Prop.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent':'received';
    return (
      <div className={`message ${messageClass}`}>
        <img src={photoURL} alt=""></img>
        <p>{text}</p>
      </div>
    )
  }

export default App;
