import React from 'react';
import { View, Button, TextInput, Slider, Text, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { categories } from '../constants';
import Categories from './Categories';

export default class Search extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			text: '',
			distance: 5,
			duration: 12,
			categories: categories,
			categoryIdx: 0,
			price: 5
		};
	}

	handleSearch() {
		Alert.alert('Confirmation',
			'Here is your submission:\n'
			+ 'Name: ' + this.state.text + '\n'
			+ 'Duration: ' + this.state.duration + ' hours \n'
			+ 'Distance: ' + this.state.distance + ' KM \n'
			+ 'Category: ' + this.state.category + '\n',
			[
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			],
			{ cancelable: false });
		Actions.search_results();
	}

	render() {
    const style = {
      flex: 1,
      backgroundColor: '#fff'
    };
    return (
			<View style={style}>
				<View style={{alignItems: 'center', justifyContent: 'center'}}>
					<TextInput style={{height: 50, width: 300}}
										 placeholder="Input your search"
										 onChangeText={(text) => this.setState({text})} />
					<Text>
						Distance: {this.state.distance} KM
					</Text>
					<Slider style={{ width: 300 }}
									step={1}
									minimumValue={0}
									maximumValue={10}
									value={this.state.distance}
									onValueChange={(result) => this.setState({distance: result})} />
					<Text>
						Duration: {this.state.duration} hours
					</Text>
					<Slider style={{ width: 300 }}
									step={0.5}
									minimumValue={0}
									maximumValue={24}
									value={this.state.duration}
									onValueChange={(result) => this.setState({duration: result})} />
					<Text>
						Rate: {this.state.price} per hour
					</Text>
					<Slider style={{ width: 300 }}
									step={5}
									minimumValue={0}
									maximumValue={500}
									value={this.state.price}
									onValueChange={(result) => this.setState({price: result})} />
				</View>

				<Categories categories={this.state.categories}
										categoryIdx={this.state.categoryIdx}
										onPress={(index) => this.setState({categoryIdx: index})} />
				<Button title="Submit search"
          			onPress={this.handleSearch.bind(this)} />
      </View>
    );
  }
}
