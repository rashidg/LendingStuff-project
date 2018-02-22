import React from 'react';
import { connect } from 'react-redux';
import { View, Button, TextInput, Slider, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {text: '', distance: 5, duration: 12};
	}
	render() {

    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <View style={style}>
      	<TextInput
          style={{height: 40}}
          placeholder="Input your search"
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          title="Submit search"
          onPress={ () => {Actions.items();} }
        />
        <Text>
        Distance: {this.state.distance} KM
        </Text>
        <Slider
        	style={{ width: 300 }}
         	step={1}
        	minimumValue={0}
         	maximumValue={10}
         	value={this.state.distance}
         	onValueChange={(result) => this.setState({distance: result})}
        />
        <Text>
        Duration: {this.state.duration} hours
        </Text>
        <Slider
        	style={{ width: 300 }}
         	step={0.5}
        	minimumValue={0}
         	maximumValue={24}
         	value={this.state.duration}
         	onValueChange={(result) => this.setState({duration: result})}
        />
      </View>
    );
  }
}
