import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {
  Text,
  KeyboardAvoidingView,
  Button,
  TextInput,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import Categories from './Categories';
import { categories } from '../constants';
import { postItem } from "../actions";


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      categoryIdx: 0,
      name: "",
      desc: "",
      rented: false,
      location: "",
      postedOn: "2018-03-02",
      expiresOn: "2018-03-22",
      rate: 0,
      owner: "lender",
      image: "../stock_image.png",
      dur: 0
    };
  }

  onSubmit() {
    const data = this.state;
    const result = this.extractData(data);


    this.props.dispatch(postItem(this.state, this.onSuccess, this.onError));
  }

  extractData(data) {
    const retData = {};

    Object.keys(data).forEach((key) => {
      let { value } = data[key];
      retData[key] = value;
    });

    return retData
  }

  onSuccess() {
    alert("Posting successful!");
    Actions.search();
  }

  onError() {
    alert("Posting unsuccessful.");
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding'
                            keyboardVerticalOffset={100}
                            style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading__cat}>Category</Text>
          <Categories categories={categories}
                      categoryIdx={this.state.categoryIdx}
                      onPress={(index) => this.setState({categoryIdx: index})} />

          <Text style={styles.heading}>Name</Text>
          <TextInput  style={styles.textInput}
                      multiline={true}
                      placeholder="Write the item name:"
                      onChangeText={(text) => this.setState({name: text})} />

          <Text style={styles.heading}>Description</Text>
          <TextInput  style={styles.textInput}
                      multiline={true}
                      placeholder="Write an item description:"
                      onChangeText={(text) => this.setState({desc: text})} />

          <Text style={styles.heading}>Duration</Text>
          <TextInput style={styles.textInput}
                     multiline={false}
                     placeholder="Enter the duration (in hours):"
                     onChangeText={(text) => {
                       if (parseInt(text) != NaN) {
                         this.setState({dur: parseInt(text)});
                       }
                     }}/>

          <Text style={styles.heading}>Meeting location</Text>
          <TextInput style={styles.textInput}
                     multiline={false}
                     placeholder="Enter the meeting location:"
                     onChangeText={(text) => this.setState({location: text})} />

          <Text style={styles.heading}>Hourly rate</Text>
          <TextInput style={styles.textInput}
                     multiline={false}
                     placeholder="Enter the the hourly rate (in $):"
                     onChangeText={(text) => {
                       if (parseInt(text) != NaN) {
                         this.setState({rate: parseInt(text)});
                       }
                     }}/>
        </ScrollView>

         <Button title="Post this item!"
                 onPress={() => this.onSubmit()}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: "5%"
  },
  heading: {
    fontSize: 20,
    color: 'grey'
  },
  heading__cat: {
    textAlign: 'center',
    fontSize: 20,
    color: 'grey'
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 20
  }
});

export default connect()(Post);
