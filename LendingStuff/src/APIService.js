import firebase from './firebase';

export const getDBItems = () => {
  return new Promise((resolve, reject) => {
    firebase.database().ref("db/").once("value", (response) => {
      return resolve(response.val());
    });
  })
};
