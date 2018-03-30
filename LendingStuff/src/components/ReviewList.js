import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Review from "./Review";

export default class ReviewList extends React.Component {

  renderReviews(reviews, limit) {
    if (reviews.length > 0) {
      if (limit) {
        return <Review review={reviews[0]} />
      } else {
        return (
          <ScrollView style={styles.container}>
            {reviews.map(this.renderReview)}
          </ScrollView>
        )
      }
    } else {
      return <Text style={styles.noReviews}>No reviews have been submitted.</Text>
    }
  }

  renderReview(review) {
    return <Review review={review}/>
  }

  calculateRating(ratings) {
    return (ratings.reduce((a, b) => (a + b), 0) / ratings.length);
  }

  render() {

    const { reviews, limit } = this.props;
    const renderReviews = this.renderReviews(reviews, limit);

    const average = (!reviews.length) ? 0 :
      this.calculateRating(reviews.map(((review) => (review.rating))));

    return (
      <View style={{backgroundColor: '#fff', padding: '5%'}}>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 25}}>Reviews</Text>
          <View style={styles.rating}>
            <Text style={styles.average}>{average.toFixed(1)}</Text>
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
    height: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  average: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  noReviews: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 10,
  }
});