import React from 'react';
import { Text, View, Switch, Button, Alert} from 'react-native';


export default class SortBar extends React.Component {

  state = {
    switchValue: true
  };

  handleToggleSwitch() {
    this.setState({
      switchValue: !this.state.switchValue
    });
  }

  handleButtonPress() {
    Alert.alert('Map View');
  };

  render() {
    const style = {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'Center'
    };

    return (
      <View style={style}>
          <Text>Sort By     </Text>
          <Text>Distance</Text>
          <Switch onValueChange={this.handleToggleSwitch.bind(this)}
                  value={this.state.switchValue} />
          <Text>Price          </Text>
          <Button title="Map View"
                  onPress={this.handleButtonPress} />
      </View>
    );
  }
}
