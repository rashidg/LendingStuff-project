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

const reduxStore = createStore(indexReducer, applyMiddleware(thunk));

export default () => (
  <Provider store={reduxStore}>
    <Router>
        <Stack key="root" back={true} >
          <Drawer
            hideNavBar
            key="drawer"
            contentComponent={SideBar}
            drawerWidth={280}
            drawerPosition="right"
          >
            <Scene key="home" back={false} component={Home} title="Home"/>
            <Scene key="items" component={Items} title="Register"/>
            <Scene key="post" component={Post} title="Post an Item"/>
            <Scene key="search" component={Search} title="Search"/>
          </Drawer>
        </Stack>
    </Router>
  </Provider>
);
