import React from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SortBar from './SortBar';

class Home extends React.Component {
  render() {

    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <View style={style}>
        <Button
          title="Post a new Item"
          onPress={ () => {Actions.post();}}
        />
        <Button
          title="Go to Items"
          onPress={ () => {Actions.items();} }
        />
        <Button
          title="Search for items"
          onPress={ () => {Actions.search();} }
        />
        <Button
          title="Item detail test placeholder"
          onPress={ () => {Actions.itemDetail();} }
        />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    ...state,
    list: state.items.items
  })
)(Home);
