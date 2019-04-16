import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import { firebase } from './firebase';

import './index.css';


const App = (props) => {
  return (
    <BrowserRouter>
      <Routes {...props} />
    </BrowserRouter>
  );
};

firebase.auth().onAuthStateChanged((user)=>{
  ReactDOM.render(<App user={user} />, document.getElementById('root'));
})

