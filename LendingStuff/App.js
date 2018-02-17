import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from 'firebase';
import { createStore, Provider } from 'redux';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';

import Items from './src/components/Items';
import Home from './src/components/Home';
import indexReducer from './src/reducers/index';

const reduxStore = createStore(indexReducer);


export default () => (
  <Router>
    <Stack key="root">
      <Scene key="home" component={Home} title="Home"/>
      <Scene key="items" component={Items} title="Register"/>
    </Stack>
  </Router>
);



// firebase.database().ref("db/").once("value", (res) => {console.log(res);});
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDELTgbOTKEIK9ZKJ7qq4qoLKUJbUUJwTI",
  authDomain: "lendingstuff-41688.firebaseapp.com",
  databaseURL: "https://lendingstuff-41688.firebaseio.com",
  projectId: "lendingstuff-41688",
  storageBucket: "lendingstuff-41688.appspot.com",
  messagingSenderId: "307235664110"
};
firebase.initializeApp(config);
