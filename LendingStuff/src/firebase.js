import * as firebase from 'firebase';
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyDELTgbOTKEIK9ZKJ7qq4qoLKUJbUUJwTI",
  authDomain: "lendingstuff-41688.firebaseapp.com",
  databaseURL: "https://lendingstuff-41688.firebaseio.com",
  projectId: "lendingstuff-41688",
  storageBucket: "lendingstuff-41688.appspot.com",
  messagingSenderId: "307235664110"
};

firebase.initializeApp(config);

export default firebase;
