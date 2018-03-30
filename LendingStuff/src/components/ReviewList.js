import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Button, StyleSheet } from 'react-native';
import Review from "./Review";
import { Actions } from 'react-native-router-flux';

export default class ReviewList extends React.Component {

  renderReviews(reviews, limit) {
    if (reviews.length > 0) {
      if (limit) {
        return (
          <View>
            <Review review={reviews[0]} />
          </View>
        )
      } else {
        return (
          <ScrollView contentContainerStyle={styles.container}>
            <View style={{flex: 1}}>
              {reviews.map(this.renderReview)}
            </View>
          </ScrollView>
        )
      }
    } else {
      return <Text style={styles.noReviews}>No reviews have been submitted.</Text>
    }
  }

  renderReview(review) {
    return <Review key={review.id} review={review}/>
  }

  calculateRating(ratings) {
    return (ratings.reduce((a, b) => (a + b), 0) / ratings.length);
  }

  render() {

    const { reviews, limit, item_id } = this.props;
    const renderReviews = this.renderReviews(reviews, limit);

    const average = (!reviews.length) ? 0 :
      this.calculateRating(reviews.map(((review) => (review.rating))));

    const ratingStyle = (!limit) ?
      {fontSize: 50, fontWeight: 'bold'} :
      {fontSize: 25, fontWeight: 'bold'};

    return (
      <View style={{backgroundColor: '#fff', padding: '5%', flex: 1}}>
        <View style={styles.textContainer}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Reviews</Text>
            <Text style={{color: 'lightgrey'}}>{reviews.length} Reviews</Text>
            {!limit &&
              <TouchableOpacity onPress={() => { Actions.push("submitReview", {item_id: item_id}) }}>
                <Text style={styles.button}>Write a review</Text>
              </TouchableOpacity>}
          </View>
          <View style={styles.rating}>
            <Text style={ratingStyle}>{average.toFixed(1)}</Text>
            <Text style={{color: 'grey'}}>/5</Text>
          </View>
        </View>

        {renderReviews}
      </View>
    )
  }
}

ReviewList.defaultProps = {
  reviews: [
    {username: "username",
      review: "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah! blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah! blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah! blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah!",
      rating: 3.5,
      postedOn: "Mar 28th 2018"}
  ],
  limit: false
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  noReviews: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    color: '#007AFF',
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 18,
  }
});