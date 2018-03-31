import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ImagePicker } from 'expo';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  KeyboardAvoidingView,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  Keyboard,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import Categories from './common/Categories';
import { categories } from '../constants';
import { postItem } from "../actions";


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryIdx: 0,
      name: "",
      desc: "",
      rented: false,
      location: "",
      rate: 0,
      owner: "lender",
      image: null,
      dur: 0
    };
  }

  componentWillUnmount() {
    Keyboard.dismiss();
  }

  onSubmit() {
    const data = this.state;
    const result = this.extractData(data);

    this.props.dispatch(postItem(result, this.onSuccess, this.onError));
  }

  extractData(data) {
    const { dur, categoryIdx, ...rest } = data;
    const cur = moment();

    return {
      ...rest,
      postedOn: cur.format(),
      expiresOn: cur.add(dur, 'h').format(),
      category: categories[categoryIdx],
      owner: this.props.user.email
    };
  }

  onSuccess() {
    alert("Posting successful!");
    Actions.pop();
  }

  onError(message) {
    alert("Posting unsuccessful: " + message);
  }

  pickImage(){
    const that = this;
    ImagePicker.launchImageLibraryAsync({base64: true, quality: 0.5}).then(response => {
      if (!response.cancelled)
        that.setState({...that.state, image: response});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

          {this.state.image &&
            <View style={{ alignItems: 'center', paddingBottom: 10 }}>
              <Image source={{ uri: this.state.image.uri }}
                     style={{width: 300, height: 400}} />
            </View>
          }
          <TouchableOpacity onPress={this.pickImage.bind(this)}
                            style={{ alignItems: 'center' }}>
            <Text style={ styles.upload }> Upload </Text>
          </TouchableOpacity>

          <Text style={styles.heading__cat}>Category</Text>
          <Categories categories={categories}
                      categoryIdx={this.state.categoryIdx}
                      onPress={(index) => this.setState({categoryIdx: index})} />

          <Text style={styles.heading}>Name</Text>
          <TextInput  style={styles.textInput}
                      placeholder="Write the item name:"
                      onChangeText={(text) => this.setState({name: text})} />

          <Text style={styles.heading}>Description</Text>
          <TextInput  style={styles.textInput}
                      multiline={true}
                      placeholder="Write an item description:"
                      onChangeText={(text) => this.setState({desc: text})} />

          <Text style={styles.heading}>Duration</Text>
          <TextInput style={styles.textInput}
                     keyboardType='numeric'
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
                     keyboardType='numeric'
                     multiline={false}
                     placeholder="Enter the the hourly rate (in $):"
                     onChangeText={(text) => {
                       if (parseFloat(text) != NaN) {
                         this.setState({rate: parseFloat(text).toFixed(2)});
                       }
                     }}/>
          <Button title="Post this item!"
                  onPress={() => this.onSubmit()}/>
        </KeyboardAwareScrollView>
      </View>
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
  },
  upload: {
    textAlign: 'center',
    color: '#333333',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    width: '70%',
    paddingTop: 10
  }
});

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Post);
