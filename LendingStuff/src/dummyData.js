export const itemList = [
  {
    category: "chargers",
    name: "Macbook 85W Charger",
    desc: "It is compatible with 15 inch Macbooks",
    rented: true,
    location: "Toronto, ON",
    postedOn: "2018-03-02",
    expiresOn: "2018-03-22",
    rate: 15,
    owner: "lender",
    image: "resource/boo.png"
  },
  {
    category: "chargers",
    name: "Macbook 65W Charger",
    desc: "Magsafe 2 charger",
    rented: false,
    location: "Toronto, ON",
    postedOn: "2018-03-02",
    expiresOn: "2018-03-22",
    rate: 15,
    owner: "lender",
    image: "resource/boo.png"
  },
  {
    category: "home products",
    name: "29pc Imperial Cobalt Drill Bit Set",
    desc: "29pc Imperial Cobalt Drill Bit Set for Stainless Steel",
    rented: true,
    location: "Toronto, ON",
    postedOn: "2018-03-02",
    expiresOn: "2018-03-22",
    rate: 10,
    owner: "lender",
    image: "resource/boo.png"
  },
  {
    category: "home products",
    name: "Screwdriver Set (6-Piece)",
    desc: "All screwdrivers are flathead",
    rented: false,
    location: "Toronto, ON",
    postedOn: "2018-03-02",
    expiresOn: "2018-03-22",
    rate: 5,
    owner: "lender",
    image: "resource/boo.png"
  },
  {
    category: "home products",
    name: "17 Piece Smart Phone Tool Kit",
    desc: "5-point star penta lobe bits, and 2-in-1 fine tip tweezers-magnifier",
    rented: false,
    location: "Toronto, ON",
    postedOn: "2018-03-02",
    expiresOn: "2018-03-22",
    rate: 5,
    owner: "lender",
    image: "resource/boo.png"
  }
];


import firebase from './firebase';

export const populateDB = () => {
  firebase.database().ref('items/').set({});

  itemList.map(item => {
    var newKey = firebase.database().ref('items/').push().key;
    firebase.database().ref('items/' + newKey).set(item);
    firebase.database().ref('items/' + newKey + '/id').set(newKey);
  });
};