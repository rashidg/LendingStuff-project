import React from 'react';
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  View,
  KeyboardAvoidingView, Keyboard
} from 'react-native';
import StarRating from 'react-native-star-rating';
import moment from 'moment';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { postReview } from "../actions";


class SubmitReview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      review: "",
      rating: 0,
    }
  }

  componentWillUnmount() {
    Keyboard.dismiss();
  }

	onStarRatingPress(rating) {
    this.setState({ rating: rating });
  }

  onSubmit() {
    const cur = moment();

    const data = {
      username: "renter",
      review: this.state.review,
      rating: this.state.rating,
      item_id: this.props.item_id,
      postedOn: cur.format()
    };

    if (data.review === "") {
      alert("Please fill in the review")
    } else {
      this.props.postReview(data, this.onSuccess, this.onError);
    }
  }

  onSuccess() {
    alert("Posting successful!");
    Actions.pop();
  }

  onError(notRented) {
    if (notRented) {
      alert("You did not rent this item!")
    } else {
      alert("Posting unsuccessful")
    }

    Actions.popTo("itemDetail");
  }

	render() {
		return (
			<KeyboardAvoidingView behavior='padding'
                            keyboardVerticalOffset={70}
                            style={styles.container}>
        <View style={styles.rating}>
          <StarRating rating={this.state.rating}
                      halfStarEnabled={true}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      containerStyle={{justifyContent: 'center'}} />
          <Text style={styles.info}>Tap a star to rate</Text>
        </View>
        <TextInput style={styles.review}
                   placeholder="Review"
                   multiline={true}
                   onChangeText={(text) => this.setState({review: text})}/>
        <TextInput/>
        <View style={styles.button}>
          <Button title="Post this review!"
                  onPress={() => this.onSubmit()}/>
        </View>
			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    flexDirection: 'column',
		justifyContent: 'center',
    backgroundColor: '#fff',
	},
  rating: {
	  width: '100%',
    padding: 5,
  },
  info: {
	  fontSize: 11,
    color: 'grey',
    textAlign: 'center',
  },
  review: {
	  flex: 1,
    marginLeft: 10,
    marginRight: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey'
  },
  button: {
	  marginBottom: 15
  }
});

export default connect(null, { postReview })(SubmitReview);