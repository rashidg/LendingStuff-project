import React from 'react';
import { connect } from 'react-redux';
import { View, Button, TextInput, Slider, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RadioForm from 'react-native-radio-form';

const mockData = [
    {
        label: 'chargers',
        value: 'charger'
    },
    {
        label: 'adapters',
        value: 'adapter'
    },
    {
        label: 'home products',
        value: 'home product'
    }
	];

export default class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {text: '', distance: 5, duration: 12, value: 0, category: ''};
	}
	_onSelect = ( item ) => {
      console.log(item);
    };
    _onSubmit = ( ) => {
    	console.log(this.state.duration);
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
        <RadioForm
              style={{ width: 350 - 30 }}
              dataSource={mockData}
              itemShowKey="label"
              itemRealKey="value"
              circleSize={16}
              initial={1}
              formVertical={true}
              labelHorizontal={true}
              onPress={(item) => this.setState({category: item.value})}
        />
        <Button
          title="Submit search"
          onPress={ () => Alert.alert(
  				'Confirmation',
  				'Here is your submission:\n'
  				 + 'Name: ' + this.state.text + '\n'
  				 + 'Duration: ' + this.state.duration + '\n'
  				 + 'Distance: ' + this.state.distance + '\n'
  				 + 'Category: ' + this.state.category + '\n',
  			[
    			{text: 'OK', onPress: () => console.log('OK Pressed')},
  			],
  			{ cancelable: false }
		) }
        />
      </View>
    );
  }
}
