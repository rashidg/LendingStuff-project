import React from 'react';

import { connect, Provider } from 'react-redux';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Scene, Router, Stack, Drawer, Actions } from 'react-native-router-flux';

import Home from './src/components/Home';
import Post from './src/components/Post';
import indexReducer from './src/reducers/index';

import Search from './src/components/Search'
import SideBar from "./src/components/SideBar";
import ItemList from './src/components/ItemList';
import ItemDetail from './src/components/ItemDetail';

import MyItems from './src/components/MyItems.js';
import RentedItems from './src/components/RentedItems.js';
import SubmitReview from './src/components/SubmitReview.js';
import ReviewList from './src/components/ReviewList.js';

const reduxStore = createStore(indexReducer, applyMiddleware(thunk));

console.disableYellowBox = true;

// import {populateDB} from './src/dummyData';
// populateDB();

export default () => (
  <Provider store={reduxStore}>
    <Router>
      <Drawer hideNavBar
              key="drawer"
              contentComponent={SideBar}
              drawerWidth={280}
              drawerPosition="right">
        <Stack key="root">
          <Scene key="home" component={Home} title="Home"/>

            <Scene key="post" component={Post} title="Post an Item"/>
            <Scene key="search" component={Search} title="Search"/>
            <Scene key="itemDetail" component={ItemDetail} title="Item Detail"/>
            <Scene key="itemList" component={ItemList} title="Item List"/>
            <Scene key="myItems" component={MyItems} title="My Items"/>
            <Scene key="rentedItems" component={RentedItems} title="Rented Items"/>
            <Scene key="submitReview" component={SubmitReview} title="Submit Review"/>
            <Scene key="reviewList" component={ReviewList} title="Reviews" />

        </Stack>
      </Drawer>
    </Router>
  </Provider>
);
