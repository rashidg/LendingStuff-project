import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Review from "./Review";

export default class ReviewList extends React.Component {

  renderReview(review) {
    return <Review review={review}/>
  }

  render() {

    const { reviews } = this.props;
    const renderReviews = reviews.map(this.renderReview);

    return (
      <ScrollView style={styles.container}>
        {renderReviews}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  }
})