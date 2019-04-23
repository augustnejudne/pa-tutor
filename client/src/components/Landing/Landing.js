import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions.js';
import { firebase } from '../../firebase.js';
import './Landing.css';
import axios from 'axios';

const Home = props => {
  useEffect(() => {}, []);

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleLogin = (accountType) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        const user = {
          displayName: result.user.displayName,
          email: result.user.email,
          uid: result.user.uid,
          accountType: accountType
        };
        axios
          .get(`/api/accounts/${result.user.uid}`)
          .then(response => {
            if (response.data.length > 0) {
              props.history.push('/');
            } else {
              axios.post('/api/accounts/add', user).then(response => {
                props.history.push('/');
              })
            }
          })
          .catch(e => console.log(e));
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="home-bg" />
      <div className="row">
        <div className="col-12 align-self-center" style={{ margin: '100px 0' }}>
          <h1 className="home-title">Pa-Tutor!</h1>
        </div>
        <div className="col-6 d-flex flex-column align-items-center">
          <h2 className="text-center tutor">
            Create a <span>tutor</span> account
          </h2>
          <button className="btn btn-danger" onClick={() => handleLogin('tutor')}>
            Sign up with Google
          </button>
        </div>
        <div className="col-6 d-flex flex-column align-items-center">
          <h2 className="text-center student">
            Create a <span>student</span> account
          </h2>
          <button className="btn btn-danger" onClick={() => handleLogin('student')}>
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    state,
  };
};

export default connect(
  mapStateToProps,
  actions
)(Home);
