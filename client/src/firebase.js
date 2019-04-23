import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: 'AIzaSyBGezFmAOB1nM9FuA4e6I-ZmFjaJ4egFZQ',
  authDomain: 'pa-tutor.firebaseapp.com',
  databaseURL: 'https://pa-tutor.firebaseio.com',
  projectId: 'pa-tutor',
  storageBucket: 'pa-tutor.appspot.com',
  messagingSenderId: '70131862871',
});

const firebaseTutors = firebase.database().ref('tutors');
const firebaseStudents = firebase.database().ref('students');

export { firebase, firebaseTutors, firebaseStudents };
