import React from 'react';
import { connect } from 'react-redux';
import { View, Button, TextInput, Slider, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RadioForm from 'react-native-radio-form';

//Ideally this list will be populated from the Database
//Or we will make use of the components created by the others (ROW specifically)
//Or we can hardcode the categories here since it is an MVP
const categories = [
    {
        label: 'chargers'
    },
    {
        label: 'adapters',
    },
    {
        label: 'home products',
    }
	];

export default class Search extends React.Component{


	constructor(props){
		super(props);
		this.state = {text: '', distance: 5, duration: 12, category: 'adapters', price: 5};
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
          		style={{height: 50, width: 300}}
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
          <Text>
            Rate: {this.state.price} per {this.state.duration}
          </Text>
          <Slider
            style={{ width: 300 }}
            step={5}
            minimumValue={0}
            maximumValue={500}
            value={this.state.price}
            onValueChange={(result) => this.setState({price: result})}
          />
        	<RadioForm
             	style={{ width: 300, height:70 }}
              	dataSource={categories}
              	itemShowKey="label"
              	itemRealKey="label"
              	circleSize={16}
              	initial={1}
              	formHorizontal={true}
              	labelHorizontal={true}
              	onPress={(item) => this.setState({category: item.label})}
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
				)}
        	/>
      </View>
    );
  }
}
