import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modal';

export default class Review extends React.Component {

  constructor() {
    super();

    this.state = {
      modal: false
    }
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }


  render() {
    const { username, review, rating, postedOn } = this.props.review;

    const renderContent = (modal) => {
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
            <StarRating disabled={true}
                        rating={rating}
                        starSize={35}
                        containerStyle={{justifyContent: 'center'}}/>
          </View>
          <Text style={{color: 'grey'}}>{username}</Text>
          <Text style={{color: 'grey'}}>{postedOn}</Text>

          {!modal ?
            <Text style={styles.review} numberOfLines={4}>{review}</Text> :
            <Text style={styles.review}>{review}</Text>
          }
        </View>
      )
    };

    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => this.toggleModal()}>
          {renderContent(false)}
          <Modal isVisible={this.state.modal} onBackdropPress={() => this.toggleModal()}>
            <View style={styles.modal}>
              {renderContent(true)}
            </View>
          </Modal>
        </TouchableOpacity>
      </View>
    )
  }
}

Review.defaultProps = {
  username: "username",
  review: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah! blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah! blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah! blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah!",
  rating: 3.5,
  postedOn: "Mar 28th 2018"
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    backgroundColor: '#dcd6e4',
    borderRadius: 15,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    padding: 15,
  },
  review : {
    marginTop: 10,
  },
  modal: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
  },
});