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
      return resolve(Object.values(snapshot.val()));
    });
  })
};

const fetchRentedItemsService = (username) => {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref('items');
    ref.orderByChild('renter').equalTo(username).once('value').then(snapshot => {
      return resolve(Object.values(snapshot.val()));
    });
  })
};

const updateRentedItemService = (item_id) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('items/' + item_id + '/rented').set(true);
    firebase.database().ref('items/' + item_id + '/renter').set("renter");
  })
};

const createTransactionService = (item_id, renter, duration) => {
  return new Promise((resolve, reject) => {
    var newKey = firebase.database().ref('transactions/').push().key;

    firebase.database().ref('transactions/' + newKey).set({
      id: newKey,
      item_id: item_id,
      renter: renter,
      duration: duration
    })

  })
}

const postItemsService = (data) => {
  return new Promise((resolve, reject) => {
    var newKey = firebase.database().ref('items/').push().key;

    firebase.database().ref('items/' + newKey).set(data);
    firebase.database().ref('items/' + newKey + '/id').set(newKey)
      .then(() => { resolve(); })
      .catch(() => { reject(); });
  });
};

export {fetchItemsService, fetchMyItemsService, fetchRentedItemsService, postItemsService, updateRentedItemService, createTransactionService};
