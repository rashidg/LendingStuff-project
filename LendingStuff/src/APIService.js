import firebase from './firebase';


//For now, filter out too-high rates and too-short durations, and select the correct category.
//var today = new Date();
//var expiration = new Date(today.getTime() + duration*60000*24);
const fetchItemsService = (query={}) => {
  return new Promise((resolve, reject) => {
    const { text, duration, distance, rate, category } = query;

    var ref = firebase.database().ref('items');
    if (category)
      ref = ref.orderByChild('category').equalTo(category);

    ref.once('value').then(snapshot => {
      if (!snapshot.val())
        return resolve([]);

      const array = Object.values(snapshot.val());
      return resolve(array);
    });
  });
};

const fetchMyItemsService = (username) => {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref('items');
    ref.orderByChild('owner').equalTo(username).once('value').then(snapshot => {
      return resolve(snapshot.val());
    });
  })
};

const fetchRentedItemsService = (username) => {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref('items');
    ref.orderByChild('renter').equalTo(username).once('value').then(snapshot => {
      return resolve(snapshot.val());
    });
  })
};

<<<<<<< HEAD
const postItemsService = (data) => {
=======
const updateRentedItemService = (item_id) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('items/' + item_id).set({
      rented: true
    });
  })
};

/* UNTESTED
const searchItemsService = (criteria) => {
  //Search criteria gives us criteria.distance, criteria.duration,
  //criteria.rate, and criteria.name.
  //For now, filter out too-high rates and too-short durations.
>>>>>>> 040e958... Added draft for action creator to update item rented status
  return new Promise((resolve, reject) => {
    var newKey = firebase.database().ref('items/').push().key;

    firebase.database().ref('items/' + newKey).set(data);
    firebase.database().ref('items/' + newKey + '/id').set(newKey)
      .then(() => { resolve(); })
      .catch(() => { reject(); });
  });
};

<<<<<<< HEAD
export {fetchItemsService, fetchMyItemsService, fetchRentedItemsService, postItemsService};
=======
export {fetchItemsService, fetchMyItemsService, fetchRentedItemsService, updateRentedItemService};
>>>>>>> 947bf2c... Exported action creator
