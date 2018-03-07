import firebase from './firebase';

export const fetchItemsService = () => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('items').once('value').then(snapshot => {
      return resolve(snapshot.val());
    });
  })
};

export const postItemsService = (data) => {
    firebase.database().ref('items/').set(data)
};