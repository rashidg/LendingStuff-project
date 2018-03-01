import React from 'react';
import {
  View,
  Text,
  Button,
} from 'react-native';

export default class SideBar extends React.Component {

  render() {
    return (
      <View>
        <Button
          title="Go to Items"
          onPress={ () => { alert("hello") } }
        />
      </View>
    )
  }
}