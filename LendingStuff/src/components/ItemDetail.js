import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, TextInput, Image, StyleSheet, ScrollView, Slider, ActivityIndicator } from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import ReviewList from "./ReviewList";
import {
  updateRentedItem,
  fetchItemTransaction,
  fetchReviews,
  createTransaction,
  returnTransaction,
  gotbackTransaction,
  closeItem,
  refuseRequestedItem,
  updateRequestedItem,
  fetchItems
} from '../actions';


class ItemDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = { duration: 1 };
  }

  componentDidMount() {
    const { item, dispatch } = this.props;
    dispatch(fetchReviews(item.id));
    dispatch(fetchItemTransaction(this.props.item.id));
  }

  handleRequest() {
    const { item, dispatch, user } = this.props;
    dispatch(updateRequestedItem(item.id, user));
    Actions.popTo('itemList');
  }

  handleRent() {
    const { item, dispatch, user } = this.props;

    dispatch(updateRentedItem(item.id, item.requester));
    dispatch(createTransaction(item.id, item.owner, item.requester, this.state.duration));
    Actions.popTo('itemList');
  }

  handleRefuse() {
    const { item, dispatch } = this.props;

    dispatch(refuseRequestedItem(item.id));
    Actions.popTo('itemList');
  }

  handleReturn() {
    const { item, dispatch } = this.props;

    dispatch(returnTransaction(item.id));
    Actions.popTo('itemList');
  }

  handleGotback() {
    const { item, dispatch } = this.props;

    dispatch(gotbackTransaction(item.id));
    Actions.popTo('itemList');
  }

  handleClose() {
    const { item, dispatch } = this.props;
    dispatch(closeItem(item.id));
    Actions.popTo('itemList');
  }

  optionsList() {
    const { transactions, isFetching, item, user } = this.props;

    if (item.owner !== user.email && !item.requested && !item.rented) {
      const hoursLeft = moment(item.expiresOn).diff(moment(), 'hours');
      return (
        <View>
          <View style={[styles.inline, { paddingLeft: 20 }]}>
            <Text style={styles.heading}>Duration: </Text>
            <Slider style={{ width: 150 }}
                    step={0.5}
                    minimumValue={0}
                    maximumValue={hoursLeft}
                    onValueChange={(hours) => this.setState({duration: hours}) }/>

            <Text style={{ paddingLeft: 15 }}>
              {this.state.duration + ' hours'}
            </Text>
          </View>

          <View style={styles.submit}>
            <Button title={"Request this item: $" + item.rate + " per hour"}
                    onPress={this.handleRequest.bind(this)}/>
          </View>
        </View>
      );
    }
    if (item.owner !== user.email && item.requested && !item.rented && item.requester === user.email) {
      return (
        <Text style={{fontSize: 16,
                      paddingTop: 10,
                      color: 'grey',
                      textAlign: 'center'}}>
          Waiting for owner's response...
        </Text>
      );
    }

    if (item.requested && item.owner === user.email) {
      return (
        <View>
          <View style={[styles.inline, { paddingLeft: 20, fontSize: 16, }]}>
            <Text>{item.requester} wants to borrow this item!</Text>
          </View>

          <View style={styles.submit}>
            <Button title={"Rent out this item: $" + item.rate + " per hour"}
                    onPress={this.handleRent.bind(this)} />
          </View>
          <View style={[styles.submit, {marginTop: 5, backgroundColor: '#f48342'}]}>
            <Button title={"Look for another renter"}
                    onPress={this.handleRefuse.bind(this)} />
          </View>
        </View>
      )
    }
    
    if (item.rented && transactions && !isFetching && !transactions.renter_confirmed && transactions.renter === user.email) {
      return (
        <View>
          <View style={[styles.inline, { paddingLeft: 20 }]}>
            <Text>You have borrowed this item.</Text>
          </View>

          <View style={styles.submit}>
            <Button title={"Confirm item return (as renter)"}
                    onPress={this.handleReturn.bind(this)} />
          </View>
        </View>
      )
    }
    if (item.rented && transactions && !isFetching && transactions.renter_confirmed && transactions.owner === user.email) {
      return (
        <View>
          <View style={[styles.inline, { paddingLeft: 20 }]}>
            <Text>You have rented out this item.</Text>
          </View>

          <View style={styles.submit}>
            <Button title={"Confirm item return (as lender)"}
                    onPress={this.handleGotback.bind(this)} />
          </View>
        </View>
      )
    }
    
    if (false && item.rented && transactions && !isFetching && transactions.lender_confirmed && transactions.renter_confirmed) {
      return (
        <View>
          <View style={[styles.inline, { paddingLeft: 20 }]}>
            <Text>This item has been returned.</Text>
          </View>

          <View style={styles.submit}>
            <Button title={"Close this item"}
                    onPress={this.handleClose.bind(this)} />
          </View>
        </View>
      )
    }

    if (item.owner === user.email && item.rented) {
      return (
        <Text style={{fontSize: 16,
                      paddingTop: 10,
                      color: 'grey',
                      textAlign: 'center'}}>
          Item rented by {item.renter}
        </Text>
      );
    }

    return null;
  }

  render() {
    const { item, reviews, transactions, isFetching } = this.props;

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


    let imgSource;
    if (item.imgUrl)
      imgSource = { uri: item.imgUrl };
    else
      imgSource = require('../image/boo.png');

    return (
      <View style={styles.container} >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: 20, alignItems: 'center'}}>
            <Image source={imgSource}
                   style={{ height: 400, width:300 }} />
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


          <View style={styles.review}>
            <View>
              <ReviewList reviews={reviews} limit={true} item_id={item.id}/>
            </View>
            <View style={styles.review__button}>
              <Button title={"Write a review"}
                      onPress={() => { Actions.push("submitReview", {item_id: item.id}); }} />
              <Button title={"See All"}
                      onPress={() => { Actions.push("reviewList", {reviews: reviews, limit: false, item_id: item.id}); }} />
            </View>
          </View>

        </ScrollView>
        { this.optionsList() }
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
  },
  review: {
    flexDirection: 'column',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginTop: 10,
    marginRight: '-5%',
    marginLeft: '-5%'
  },
  review__button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '-5%',
    marginLeft: '5%',
    marginRight: '5%',
  }
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
  reviews: state.items.reviews,
  transactions: state.transactions.data
});

export default connect(mapStateToProps)(ItemDetail);
