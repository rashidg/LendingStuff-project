import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Scene, Router, Stack } from 'react-native-router-flux';

import Items from './src/components/Items';
import Home from './src/components/Home';
import Post from './src/components/Post';
import indexReducer from './src/reducers/index';
import Search from './src/components/Search';
import SearchResults from './src/components/SearchResults';

const reduxStore = createStore(indexReducer, applyMiddleware(thunk));

export default () => (
  <Provider store={reduxStore}>
    <Router>
      <Stack key="root">
        <Scene key="home" component={Home} title="Home"/>
        <Scene key="items" component={Items} title="Register"/>
        <Scene key="post" component={Post} title="Post an Item"/>
        <Scene key="search" component={Search} title="Search"/>
        <Scene key="search_results" component={SearchResults} title="Search Results"/>
      </Stack>
    </Router>
  </Provider>
);
