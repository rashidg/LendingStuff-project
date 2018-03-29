import React from 'react';
import { connect } from 'react-redux'
import { Text, View, Button, TextInput, Image, StyleSheet, ScrollView, Slider, Linking } from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import Review from './Review';

import { updateRentedItem, createTransaction } from '../actions';
import ReviewList from "./ReviewList";


class ItemDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = { duration: 1 };
  }

  handleRent() {
    const { item, dispatch } = this.props;
    dispatch(updateRentedItem(item.id));
    dispatch(createTransaction(item.id, "renter", this.state.duration));
    Actions.popTo('itemList');
  }

  render() {
    const { item } = this.props;
    const { reviews } = item;

    //URL which stores google maps location of item
    const locationurl = "https://www.google.com/maps/search/?api=1&query=" + item.location.latitude + "," + item.location.longitude;

    //URL which stores google maps directions to item's location
    const directionsurl = "https://www.google.com/maps/dir/?api=1&destination=" + item.location.latitude + "," + item.location.longitude;

    const goToUrl = url => Linking.openURL(url).catch(err => console.error('An error occurred', err));

    const renderInline = (title, text) => (
      <View style={styles.inline}>
        <Text style={styles.heading}>{title}:</Text>
        <Text>{text}</Text>
      </View>
    );

    const hoursLeft = moment().diff(moment(item.postedOn), 'hours');

    const renderReviews = (reviews) => (
      <View style={{flexDirection: 'column', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'grey', marginTop: 15}}>
        <Text style={{fontSize: 20, marginTop: 15}}>Reviews</Text>
        <View style={{height: 200}}>
          <ReviewList reviews={Object.values(reviews)}/>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button title={"Write a review"}
                  onPress={() => { Actions.push("submitReview", {item_id: item.id}); }} />
          <Button title={"See All"}
                  onPress={() => { Actions.push("reviewList", {reviews: reviews}); }} />
        </View>
      </View>
    )

    return (
      <View style={styles.container} >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: 20, alignItems: 'center'}}>
            <Image source={require('../image/boo.png')} />
          </View>

          {renderInline('Name', item.name)}
          {renderInline('Category', item.category)}

          <View style={{paddingTop: 5, paddingBottom: 5}}>
            <Text style={styles.heading}>Description :</Text>
            <Text>{item.desc}</Text>
          </View>

          {renderInline('Owner', item.owner)}
          {renderInline('Posted', moment().to(moment(item.postedOn)))}
          {renderInline('Expiry', moment().to(moment(item.expiresOn)))}


          <View style={{flexDirection: 'column', borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'grey', marginTop: 15}}>
            <Text style={{fontSize: 20, marginTop: 15}}>Reviews</Text>
            { reviews &&
              <View style={{height: 200}}>
                <ReviewList reviews={Object.values(reviews)}/>
              </View>
            }
            { !reviews &&
              <Text style={{color: 'grey', textAlign: 'center', marginTop: 10}}>No reviews have been submitted.</Text>
            }
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button title={"Write a review"}
                      onPress={() => { Actions.push("submitReview", {item_id: item.id}); }} />
              <Button title={"See All"}
                      onPress={() => { Actions.push("reviewList", {reviews: reviews}); }} />
            </View>
          </View>


        </ScrollView>

        { !item.rented &&
          <View>
            <View style={[styles.inline, { paddingLeft: 20 }]}>
              <Text style={styles.heading}>Duration: </Text>
              <Slider style={{ width: 150 }}
                      step={1}
                      minimumValue={0}
                      maximumValue={hoursLeft}
                      onSlidingComplete={(hours) => this.setState({duration: hours})} />

              <Text style={{ paddingLeft: 15 }}>
                {moment.duration(this.state.duration, 'hours').humanize()}
              </Text>
            </View>
            <View style={styles.location}>
              <Button title="Show location" style={styles.submit}
                      onPress={ () => goToUrl(locationurl)} />
              <Button title="Show directions" style={styles.submit}
                      onPress={ () => goToUrl(directionsurl)} />
            </View>
            <View style={styles.submit}>
              <Button title={"Rent this item: $" + item.rate + "hour"}
                      onPress={this.handleRent.bind(this)} />
            </View>
          </View>
        }
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
    fontSize: 16,
    paddingRight: 5,
    color: 'grey'
  },
  text: {
    paddingBottom: 20
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  submit: {
    backgroundColor:'#2f3699',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  location: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center'
  }
});


export default connect()(ItemDetail);
