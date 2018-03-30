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
  approveTransaction,
  returnTransaction,
  gotbackTransaction,
  updateRequestedItem
} from '../actions';


class ItemDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = { duration: 1 };
  }

  componentDidMount() {
    const { item, dispatch } = this.props;
    dispatch(fetchItemTransaction(item.id));
  }

  componentDidMount() {
    const {item, dispatch} = this.props;
    dispatch(fetchReviews(item.id));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.value !== nextProps.value;
  }

  handleRequest() {
    const { item, dispatch } = this.props;
    dispatch(updateRequestedItem(item.id));
    Actions.popTo('itemList');
  }

  handleRent() {
    const { item, dispatch } = this.props;

    dispatch(updateRentedItem(item.id));
    dispatch(createTransaction(item.id, "lender", "renter", this.state.duration));
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
    dispatch(closeTransaction(item.id));
    Actions.popTo('itemList');
  }

  optionsList() {
    const { item, isFetching, transactions } = this.props;

    if (item.requested && item.owner === "lender") {
      return (
        <View>
          <View style={[styles.inline, { paddingLeft: 20 }]}>
            <Text>{item.requester} wants to borrow this item!</Text>
          </View>

          <View style={styles.submit}>
            <Button title={"Rent out this item: $" + item.rate + " per hour"}
                    onPress={this.handleRent.bind(this)} />
          </View>
        </View>
      )
    }

    if (!item.requested && !item.rented) {
      return (
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

          <View style={styles.submit}>
            <Button title={"Request this item: $" + item.rate + " per hour"}
                    onPress={this.handleRequest.bind(this)} />
          </View>
        </View>
      )
    }

    if (isFetching) {
      return (
        <View style={{backgroundColor: 'white', height: '100%'}}>
          <ActivityIndicator size='large'
                             animating={isFetching}
                             style={{paddingTop: 20}}/>
        </View>
      )
    }
    if (!isFetching && transactions.length && !(transactions[0].lender_approved) && transactions[0].owner === "lender") {
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
    if (!isFetching && transactions.length && !(transactions[0].borrower_approved) && transactions[0].renter === "renter") {
      return (
        <View>
          <View style={[styles.inline, { paddingLeft: 20 }]}>
            <Text>You have borrowed this item.</Text>
          </View>

          <View style={styles.submit}>
            <Button title={"Confirm item return (as borrower)"}
                    onPress={this.handleReturn.bind(this)} />
          </View>
        </View>
      )
    }
    if (!isFetching && transactions.length && transactions[0].lender_approved && transactions[0].borrower_approved) {
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
    return (
      <View></View>
    )
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

    const hoursLeft = moment().diff(moment(item.postedOn), 'hours');

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
  reviews: state.items.reviews
});

export default connect(mapStateToProps)(ItemDetail);
