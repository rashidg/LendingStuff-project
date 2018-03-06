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

const searchItemsService = (criteria) => {
  //Search criteria gives us criteria.distance, criteria.duration,
  //criteria.rate, and criteria.name.
  //For now, filter out too-high rates and too-short durations.
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref('items');
    var today = new Date();

    var expiration = new Date(today.getTime() + criteria.duration*60000*24);

    ref.orderByChild('expiresOn').endAt(expiration)
      .orderByChild('rate').endAt(criteria.rate)
      .once('value').then(snapshot => {
        return resolve(snapshot.val());
    });
  })
};

export {fetchItemsService, myItemsService, rentedItemsService, searchItemsService};
