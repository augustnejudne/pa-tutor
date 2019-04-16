import React from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase.js';

const Nav = () => {
  const handeLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
        console.log(error);
      });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('log out successfull');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/sample-private">Private</Link>
      <Link to="/sample-public">Public</Link>
      <Link onClick={handeLogin}>login</Link>
      <Link onClick={handleLogout}>logout</Link>
    </div>
  );
};

export default Nav;
