import React from 'react';

import { connect, Provider } from 'react-redux';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Scene, Router, Stack, Drawer, Actions } from 'react-native-router-flux';

import Items from './src/components/Items';
import Home from './src/components/Home';
import Post from './src/components/Post';
import indexReducer from './src/reducers/index';

import Search from './src/components/Search'
import SideBar from "./src/components/SideBar";
import ItemDetail from './src/components/ItemDetail'
import SearchResults from './src/components/SearchResults';

import MyItems from './src/components/MyItems.js';
import RentedItems from './src/components/RentedItems.js';

const reduxStore = createStore(indexReducer, applyMiddleware(thunk));

console.disableYellowBox = true;

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
          <Scene key="items" component={Items} title="Register"/>
          <Scene key="post" component={Post} title="Post an Item"/>
          <Scene key="search" component={Search} title="Search"/>
          <Scene key="itemDetail" component={ItemDetail} title="Item Detail"/>
          <Scene key="search_results" component={SearchResults} title="Search Results"/>
          <Scene key="myItems" component={MyItems} title="My Items"/>
          <Scene key="rentedItems" component={RentedItems} title="Rented Items"/>
        </Stack>
      </Drawer>
    </Router>
  </Provider>
);
