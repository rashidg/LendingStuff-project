/**
 * The Item component.
 * Information displayed by this component differs depending on which Page the user
 * is viewing this component from.
 *
 * This assumes that props passed to this component include:
 *    .item: data related to this single item to display, including:
 *        .name: name
 *        .desc: description
 *        .image: path to the image (using static image for now)
 *        .status: status of this item ("for rent", "rented") - will be displayed
 *        .startDate: when this item was posted
 *        .endDate: until when this item is up for rent
 *        .returnDatetime: (if status="rented") when this item needs to be returned
 *    .view: which view this item is being displayed on
 *        "ResultView", "MyItems", "RentedItems"
 */

import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

/* View constants */
const ResultView = "ResultView";
const MyItems = "MyItems";
const RentedItems = "RentedItems";
/* Item status constants */
const rented = "rented";
const forRent = "forRent";


/* Dummy data: This is set as state for now, should be updated such that
 * these data are received as props from parent in the future.
 */
const dummyItem = {
  name: "USB-C to Lightning Cable Lightning Lightning",
  desc: "used for charging/connecting iPhones, good condition! more random text to fill up space! more random text to fill up space! more random text to fill up space! ",
  image: "resource/boo.png",
  status: "rented",
  location: "Toronto, ON",
  startDate: "2017-12-20",
  endDate: "2018-03-12",
  returnTime: "2018-03-10 18:00"
};
const dummyView = ResultView;




export default class Item extends React.Component {

  /*
   * item & view: only used for setting up dummy data - should be replaced by props
   * timeLeft: time left until this item needs to be returned. This should be calculated
   *        and set/updated, not set to default like here.
   */
  constructor(props) {
    super(props);

    this.state = {
      item: dummyItem,
      view: dummyView,
      timeLeft: {
        hour: 3,
        min: 30,
      }
    }
  }


  /*
   * Build relevant description for the item
   * desc: description below item name
   *    - "ResultView": item description
   *    - "MyItems" (lender view): post range (startDate ~ endDate), meeting location?
   *    - "RentedItems" (renter view): return by, meeting location?
   */
  getDesc(view) {

    if (this.state.view === ResultView) {
      return this.state.item.desc

    } else if (this.state.view === MyItems) {
      return "Post: " + this.state.item.startDate + "~" + this.state.item.endDate + "\n"

    } else if (this.state.view === RentedItems) {
      return "Return by: " + this.state.item.returnTime + "\n"
    }
  }


  /* TODO: decide on how to store location & to calculate distance
   * getDistance: for the first badge below description
   *    - visible only when in "ResultView"
   *    - should show distance to meeting location
   */
  getDistance(location) {

    if (this.state.view === ResultView) {
      return (
        <View style={styles.badge}>
          <Text style={styles.badge__text}>5km</Text>
        </View>
      )

    } else {
      return (
        <View style={[styles.badge, {opacity: 0}]} />
      )
    }
  }


  /* TODO: decide on how/when to calculate price for this item
   * TODO: implement counter? to show how much time is left until the item needs to be returned
   * priceOrTimeLeft: for the second badge under description
   *    - "ResultView": price - should be calculated by user input and cheapest rate for this item
   *    - "MyItems": if status is rented, show how much time is left until return time
   *    - "RentedItems": show how much time is left until return time (status=RENTED)
   */
  priceOrTimeLeft() {

    if (this.state.view === ResultView) {
      return (
        <View style={styles.badge}>
          <Text style={styles.badge__text}>$20</Text>
        </View>
      )

    } else if (this.state.item.status === rented) {
      let timeStr = this.state.timeLeft.hour + ":" + this.state.timeLeft.min;

      return (
        <View style={styles.badge}>
          <Text style={styles.badge__text}>{ timeStr }</Text>
        </View>
      )
    }
  }


  render() {
    return (

      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("./boo.png")}
        />
        <View style={styles.info}>
          <View style={styles.info__text}>
            <Text numberOfLines={1} style={styles.item__name}>
              {this.state.item.name}
            </Text>
            <Text numberOfLines={3} style={{flex: 1, color: "#404040"}}>
              {this.getDesc(this.state.view)}
            </Text>
          </View>
          <View style={styles.info__bottom}>
            {this.getDistance(this.state.item.location)}
            {this.priceOrTimeLeft()}
            <View style={[styles.badge, {width: '40%', backgroundColor: '#7b37ba'}]}>
              <Text style={styles.badge__text}>
                {this.state.item.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 150,
    backgroundColor: '#fff',
    borderColor: '#2e3681',
    borderRadius: 15,
    borderWidth: 1,
    margin: 5,
  },
  image: {
    alignSelf: 'center',
    width: 130,
    height: 130,
    marginLeft: 10,
    borderRadius: 15,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: '#fff',
    // borderColor: '#4b2481',
    // borderWidth: 1,
    height: 130,
    margin: 10,
  },
  info__text: {
    // backgroundColor: '#372c44',
    height: '70%'
  },
  item__name: {
    // flex: 1,
    margin: 0,
    fontSize: 18,
    color: '#000',
    marginBottom: 2,
  },
  info__bottom: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: '30%',
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f3699',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    margin: 1,
    width: '30%',
  },
  badge__text: {
    color: '#fff',
    fontSize: 18,
  }
});