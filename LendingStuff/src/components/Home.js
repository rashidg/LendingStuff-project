import React from 'react';
import { View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class Home extends React.Component {

  render() {

    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <View style={style}>
        <Button title="Login with something"
                onPress={ () => {Actions.search();}} />
        <Button title="Post a new Item"
                onPress={ () => {Actions.post();}} />
        <Button title="Go to Items"
                onPress={ () => {Actions.items();} } />
        <Button title="Search for items"
                onPress={ () => {Actions.search();} } />
        <Button title="items"
                onPress={ () => {Actions.items();}} />
      </View>
    );
  }
}
