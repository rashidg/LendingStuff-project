import React from 'react';
import {
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	View
} from 'react-native';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import moment from 'moment';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { postReview } from "../actions";


class SubmitReview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      review: "",
      rating: 0,
    }
  }

	toggleModal() {
		this.setState({ isVisible: !this.state.isVisible });
	}

	onStarRatingPress(rating) {
    this.setState({ rating: rating });
  }

  onSubmit() {
    console.log(this.state.rating + " " + this.state.review);
    this.toggleModal();
    const cur = moment().format("MMM Do YYYY")

    const data = {
      username: "testUser",
      review: this.state.review,
      rating: this.state.rating,
      item_id: this.props.item_id,
      postedOn: cur
    };

    this.props.postReview(data, this.onSuccess, this.onError);
  }

  onSuccess() {
    console.log("Posting successful!");
    Actions.popTo("home");
  }

  onError(message) {
    console.log("Posting unsuccessful: " + message);
  }

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.button} onPress={() => this.toggleModal()}>
					<Text>Write a review!</Text>
				</TouchableOpacity>
				<Modal isVisible={this.state.isVisible} avoidKeyboard={true} onBackdropPress={() => this.toggleModal()}>
					<View style={styles.modal}>
            <StarRating rating={this.state.rating}
                        halfStarEnabled={true}
                        selectedStar={(rating) => this.onStarRatingPress(rating)} />
						<View style={styles.textBox}>
							<TextInput placeholder="Write a review!"
												 multiline={true}
												 maxHeight={200}
												 onChangeText={(text) => this.setState({review: text})} />
						</View>
						<TouchableOpacity style={styles.button} onPress={() => this.onSubmit()}>
							<Text>Submit</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		backgroundColor: 'lightblue',
    padding: 12,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	modal: {
		backgroundColor: 'white',
		padding: 22,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)'
	},
	textBox: {
	  alignSelf: 'stretch',
    borderColor: 'grey',
    borderRadius: 4,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
		marginBottom: 10
	},
});

export default connect(null, { postReview })(SubmitReview);