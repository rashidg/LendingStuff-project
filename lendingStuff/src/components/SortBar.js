import React from 'react';

import { Text, View, Switch, Button, Alert} from 'react-native';



class SortBar extends React.Component {

  state = {

    switchValue: true

  };



  _handleToggleSwitch = () => this.setState(state => ({

    switchValue: !state.switchValue

  }));



  _handleButtonPress = () => {

    Alert.alert(
'Map View');

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


          <Switch

            onValueChange={this._handleToggleSwitch}

            value={this.state.switchValue}

          />


          <Text>Price          </Text>


          <Button

            title="Map View"

            onPress={this._handleButtonPress}

          />
    
      </View>

    );

  }

}