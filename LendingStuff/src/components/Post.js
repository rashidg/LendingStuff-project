import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, TextInput } from 'react-native';

import ItemList from './ItemList';
import { fetchData } from '../actions';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Placeholder: srcless image should appear transparent
      pic_src: "about:blank",

      desc: "",
      dur: 0,
      meetLoc: "",
      rate: 0,

      categories: ["Phone Chargers", "Textbooks", "Yachts", "Chihuahuas"],
      categoryIdx: 0
    };
  }

  replaceImage() {
    //Placeholder: does nothing
  }

  render() {
    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    };

    return (
      <View style={style}>
        //Placeholder: should get src of image from user, then
        //replace picture.src
        <img src=this.state.pic_src
             height=20
             width=20
             onPress={() => this.replaceImage();}>
        {
          this.categories.map(
            (key, index) =>
            ( if (index == categoryIdx) {
                <Button title=key.toUpperCase()
                        onPress={(index) => {this.state.categoryIdx = index;}}/>
              }
              else {
                <Button title=key.toLowerCase()
                        onPress={(index) => {this.state.categoryIdx = index;}}/>
              } )
        }

        <Text>Description:</Text>
        <TextInput
          style={{height: 200}}
          placeholder="Write an item description:"
          onChangeText={(text) => {this.state.desc = text;}} />

        <Text>Duration:</Text>
        <TextInput
          style={{height: 200}}
          placeholder="Enter the duration (in hours):"
          onChangeText={(text) => {
            if (parseInt(text) != NaN) {
              this.state.dur = parseInt(text);
            }
            else {
              placeholder="Enter the duration (in hours):";
            }
          }/>

        <Text>Meeting_location:</Text>
        <TextInput
          style={{height: 200}}
          placeholder="Enter the meeting location:"
          onChangeText={(text) => {this.state.meetLoc = text;}} />

        <Text>Hourly_rate:</Text>
        <TextInput
          style={{height: 200}}
          placeholder="Enter the the hourly rate (in $):"
          onChangeText={(text) => {
            if (parseInt(text) != NaN) {
              this.state.rate = parseInt(text);
            }
            else {
              placeholder="Enter the the hourly rate (in $):";
            }
          }/>
      </View>
    );
  }
}
