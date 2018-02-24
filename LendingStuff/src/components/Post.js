import React from 'react';
import { Text, View, Button, TextInput, Image } from 'react-native';

import Categories from './Categories';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pic_src: "../stock_image.png",
      desc: "",
      dur: 0,
      meetLoc: "",
      rate: 0,
      categories: ["Phone Chargers", "Textbooks", "Yachts", "Chihuahuas"],
      categoryIdx: 0
    };
  }


  render() {
    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    };

    return (
      <View style={style}>

        <Image source={{ uri: this.state.pic_src }}
               style={width=50, height=50}/>
        <Button title="Upload a new image"
                onPress={() => {alert("Upload new image")}}/>

        <Categories categories={this.state.categories}
                    categoryIdx={this.state.categoryIdx}
                    onPress={(index) => this.setState({categoryIdx: index})} />

        <Text>Description:</Text>
        <TextInput  style={{height: 50, width: 200}}
                    placeholder="Write an item description:"
                    onChangeText={(text) => this.setState({desc: text})} />

        <Text>Duration:</Text>
        <TextInput style={{height: 50, width: 200}}
                   placeholder="Enter the duration (in hours):"
                   onChangeText={(text) => {
                     if (parseInt(text) != NaN) {
                       this.setState({dur: parseInt(text)});
                     }
                   }}/>

        <Text>Meeting_location:</Text>
        <TextInput style={{height: 50, width: 200}}
                   placeholder="Enter the meeting location:"
                   onChangeText={(text) => this.setState({meetLoc: text})} />

        <Text>Hourly_rate:</Text>
        <TextInput style={{height: 50, width: 200}}
                   placeholder="Enter the the hourly rate (in $):"
                   onChangeText={(text) => {
                     if (parseInt(text) != NaN) {
                       this.setState({rate: parseInt(text)});
                     }
                   }}/>
      </View>
    );
  }
}
