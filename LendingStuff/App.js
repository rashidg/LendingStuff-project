import React from 'react';
import { connect, Provider } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Scene, Router, Stack } from 'react-native-router-flux';

import Items from './src/components/Items';
import Home from './src/components/Home';
import indexReducer from './src/reducers/index';

const reduxStore = createStore(indexReducer, applyMiddleware(thunk));

export default () => (
  <Provider store={reduxStore}>
    <Router>
      <Stack key="root">
        <Scene key="home" component={Home} title="Home"/>
        <Scene key="items" component={Items} title="Register"/>
      </Stack>
    </Router>
  </Provider>
);
