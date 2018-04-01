import { Location, Permissions } from 'expo';
import moment from 'moment';
import b64 from 'base64-js';

import firebase from './firebase';


async function getLocationAsync() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status === 'granted') {
    return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
  } else {
    throw new Error('Location permission not granted');
  }
}

const calcDistance = (loc1, loc2) => {
  const lat1 = loc1.latitude;
  const lon1 = loc1.longitude;
  const lat2 = loc2.latitude;
  const lon2 = loc2.longitude;

  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
    c(lat1 * p) * c(lat2 * p) *
    (1 - c((lon2 - lon1) * p))/2;

  if (!a)
    return 0;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

export const fetchItemsService = (query={}) => {
  return new Promise((resolve, reject) => {
    getLocationAsync()
      .then(location => {
        const { text, duration, distance, rate, category } = query;

        var ref = firebase.database().ref('items');
        if (category)
          ref = ref.orderByChild('category').equalTo(category);

        ref.once('value').then(snapshot => {
          if (!snapshot.val())
            return resolve([]);

          const array = Object.values(snapshot.val());

          const withDistances = array.map(item => ({
            ...item,
            distance: Math.round(calcDistance(item.location, location.coords) * 10) / 10
          }));

          const sortedByDistance = withDistances.sort((a, b) => a.distance > b.distance);

          const filteredArray = sortedByDistance.filter(item => {
            let ret = true;
            if (duration && moment().add(duration, 'hours').isAfter(moment(item.expiresOn)))
              ret = false;
            if (category && item.category != category)
              ret = false;
            if (rate && item.rate > rate)
              ret = false;
            if (text && !item.name.includes(text) && !item.desc.includes(text))
              ret = false;
            if (distance && item.distance > distance)
              ret = false;

            return ret;
          });

          return resolve(filteredArray);
        });
      });
  });
};

export const fetchMyItemsService = (username) => {
  return new Promise((resolve, reject) => {
    getLocationAsync()
      .then(location => {
        var ref = firebase.database().ref('items');
        ref.orderByChild('owner').equalTo(username).once('value').then(snapshot => {
          if (!snapshot.val())
            return resolve([]);

          const array = Object.values(snapshot.val());

          const withDistances = array.map(item => ({
            ...item,
            distance: Math.round(calcDistance(item.location, location.coords) * 10) / 10
          }));

          const sortedByDistance = withDistances.sort((a, b) => a.distance > b.distance);
          resolve(sortedByDistance);
        }).catch((err) => {alert(err);});
      })
  })
};

export const fetchItemTransactionService = (item_id) => {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref('transactions');
    ref.orderByChild('item_id').equalTo(item_id).once('value').then(snapshot => {
      if (!snapshot.val())
        return resolve(null);

      const array = Object.values(snapshot.val());
      return resolve(array[array.length - 1]);
    });
  })
};

export const fetchRentedItemsService = (email) => {
  return new Promise((resolve, reject) => {
    getLocationAsync()
      .then(location => {
        var ref = firebase.database().ref('items');
        ref.orderByChild('renter').equalTo(email).once('value').then(snapshot => {
          if (!snapshot.val())
            return resolve([]);

          const array = Object.values(snapshot.val());

          const withDistances = array.map(item => ({
            ...item,
            distance: Math.round(calcDistance(item.location, location.coords) * 10) / 10
          }));

          const sortedByDistance = withDistances.sort((a, b) => a.distance > b.distance);
          return resolve(sortedByDistance);
        }).catch((err) => {alert(err);});
      })
  })
};

export const updateRentedItemService = (item_id, user) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('items/' + item_id).update({
      requested: false,
      rented: true,
      renter: user,
      requester: null
    }).then(() => { resolve() });
  })
};

export const updateRequestedItemService = (item_id, user) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('items/' + item_id).update({
      requested: true,
      rented: false,
      renter: null,
      requester: user.email
    }).then(() => { resolve() });
  })
};

export const refuseRequestedItemService = (item_id) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('items/' + item_id).update({
      requested: false,
      rented: false,
      renter: null,
      requester: null
    }).then(() => { resolve() });
  })
};

export const createTransactionService = (item_id, owner, renter, duration) => {
  return new Promise((resolve, reject) => {
    var newKey = firebase.database().ref('transactions/').push().key;

    firebase.database().ref('transactions/' + newKey).set({
      item_id: item_id,
      owner: owner,
      renter: renter,
      duration: duration,
      lender_confirmed: false,
      renter_confirmed: false
    })
  })
};

export const returnTransactionService = (item_id) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('transactions').orderByChild('item_id').equalTo(item_id).limitToLast(1).once('value')
      .then(sn => {
        const key = Object.keys(sn.val())[0];
        firebase.database().ref('transactions/' + key + '/renter_confirmed').set(true);
      });
  })
};

export const gotbackTransactionService = (item_id) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('transactions').orderByChild('item_id').equalTo(item_id).limitToLast(1).once('value')
      .then(sn => {
        const key = Object.keys(sn.val())[0];
        firebase.database().ref('transactions/' + key + '/lender_confirmed').set(true);
      });
    firebase.database().ref('items/' + item_id).update({
      requested: false,
      rented: false,
      renter: null,
      requester: null
    });
  })
};

export const closeItemService = (item_id) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('items/' + item_id).set({});
    firebase.database().ref('transactions/' + item_id).set({});
  })
};

export const postItemsService = (item) => {
  return new Promise((resolve, reject) => {
    getLocationAsync()
      .then(location => {
        var newKey = firebase.database().ref('items/').push().key;

        if (item.image) {
          const byteArray = b64.toByteArray(item.image.base64);
          const metadata = {contentType: 'image/jpg'};
          firebase.storage().ref('/images').child(newKey + '.jpg').put(byteArray, metadata).then(snapshot => {
            firebase.database().ref('items/' + newKey).update({
              imgUrl: snapshot.downloadURL
            });
          });
        }

        firebase.database().ref('items/' + newKey).set({
          ...item,
          id: newKey,
          location: {
            lat: location.coords.latitude,
            lon: location.coords.longitude
          }
        }).then(() => { resolve(); }).catch(() => { reject(); });
      });
  });
};


export const fetchReviewsService = (item_id) => {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref('reviews/');
    ref.orderByChild('item_id').equalTo(item_id).once('value').then(snapshot => {
      if (!snapshot.val()) return resolve([]);

      const array = Object.values(snapshot.val());
      const sortedByTime = array.sort((a, b) => a.postedOn < b.postedOn)
      return resolve(sortedByTime)
    })
  })
};

export const postReviewService = (data) => {
  return new Promise((resolve, reject) => {
    var { username, item_id } = data;

    confirmRenter(username, item_id)
      .then(() => {
        var newKey = firebase.database().ref('reviews/').push().key;
        firebase.database().ref('reviews/' + newKey).set({
          ...data,
          id: newKey
        })
          .then(() => { resolve() })
          .catch((err) => { reject(err) })
      })
      .catch(() => { reject(true); });
  });
};

const confirmRenter = (username, item_id) => {
  return new Promise((resolve, reject) => {
    var ref = firebase.database().ref('transactions/');
    ref.orderByChild('item_id').equalTo(item_id).once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          var childData = childSnapshot.val();
          if (childData.renter === username) {
            return resolve();
          }
        });
        return reject();
      })
      .catch(() => reject());
  })
};

export const registerService = (data) => {
  return new Promise((resolve, reject) => {
    const { email, password } = data;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.updateProfile({
            displayName: data.username
          }).then(function(){console.log(user)}).catch(function(error){console.log(error)}); 
        resolve(user);
      })
      .catch((err) => { reject(err) })
  })
};

export const logInService = (data) => {
  return new Promise((resolve, reject) => {
    const { email, password } = data;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  })
};
