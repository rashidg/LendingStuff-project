import firebase from './firebase';

const fetchItemsService = () => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('items').once('value').then(snapshot => {
      return resolve(snapshot.val());
    });
  })
};

const myItemsService = (username) => {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref('items');
    ref.orderByChild('owner').equalTo(username).once('value').then(snapshot => {
      return resolve(snapshot.val());
    });
  })
};

const rentedItemsService = (username) => {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref('items');
    ref.orderByChild('renter').equalTo(username).once('value').then(snapshot => {
      return resolve(snapshot.val());
    });
  })
};

export {fetchItemsService, myItemsService, rentedItemsService};
