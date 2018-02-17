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
        <Button
          title="Go to Items"
          onPress={() => {Actions.items();}}
        />
      </View>
    );
  }
}
