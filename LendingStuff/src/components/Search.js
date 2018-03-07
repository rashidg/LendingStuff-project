import React from 'react';
import { View, Button, TextInput, Slider, Text, Alert, ScrollView } from 'react-native';
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
			rate: 5
		};
	}

	handleSearch() {
		Alert.alert('Confirmation',
			'Here is your submission:\n'
			+ 'Name: ' + this.state.text + '\n'
			+ 'Duration: ' + this.state.duration + ' hours \n'
			+ 'Distance: ' + this.state.distance + ' KM \n'
			+ 'Category: ' + this.state.categories[this.state.categoryIdx] + '\n',
			[
				{text: 'OK', onPress: () => console.log('OK Pressed')},
			],
			{ cancelable: false });
		var criteria = {
			text: this.state.text,
			duration: this.state.duration,
			distance: this.state.distance,
			rate: this.state.rate,
			category: this.state.categories[this.state.categoryIdx]
		}
		Actions.search_results({criteria});
	}

	render() {
    const style = {
      flex: 1,
      backgroundColor: '#fff',
			padding: '5%'
    };
		const textStyle = {
			fontSize: 20,
			textAlign: 'center'
		};
    return (
			<View style={style}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Text style={textStyle}>Category</Text>
					<Categories categories={this.state.categories}
											categoryIdx={this.state.categoryIdx}
											onPress={(index) => this.setState({categoryIdx: index})} />

					<View style={{alignItems: 'center', justifyContent: 'center'}}>

						<Text style={textStyle}>Distance: {this.state.distance} KM</Text>
						<Slider style={{ width: 300 }}
										step={1}
										minimumValue={0}
										maximumValue={50}
										value={this.state.distance}
										onSlidingComplete={(result) => this.setState({distance: result})} />

						<Text style={textStyle}>Duration: {this.state.duration} hours</Text>
						<Slider style={{ width: 300 }}
										step={0.5}
										minimumValue={0}
										maximumValue={24}
										value={this.state.duration}
										onSlidingComplete={(result) => this.setState({duration: result})} />

						<Text style={textStyle}>Rate: {this.state.rate} per hour</Text>
						<Slider style={{ width: 300 }}
										step={1}
										minimumValue={0}
										maximumValue={100}
										value={this.state.rate}
										onSlidingComplete={(result) => this.setState({rate: result})} />

						<Text style={textStyle}>Text</Text>
						<TextInput style={{height: 50, width: 300, textAlign: 'center'}}
											 placeholder="Input your search"
											 onChangeText={(text) => this.setState({text})} />
					</View>
				</ScrollView>
				<Button title="Submit search"
          			onPress={this.handleSearch.bind(this)} />
      </View>
    );
  }
}
