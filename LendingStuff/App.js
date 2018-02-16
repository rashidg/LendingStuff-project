import React from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';

import ItemList from './src/itemList';

export default class App extends React.Component {
  render() {
      var database = firebase.database();

      database.ref('db/').set({
          items: [
              "Macbook Charger",
              "Iphone Charger",
              "Android Charger"
          ]
      });

      var itemList = [];
      database.ref("db/").once("value", (res) => {
          console.log(res.val().items);
          itemList = res.val().items;
      });

    return (
      <View style={styles.container}>
          <ItemList items={itemList} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


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