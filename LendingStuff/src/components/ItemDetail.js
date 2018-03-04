import React from 'react';
import { Text, View, Button, TextInput, Image } from 'react-native';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    //PLACEHOLDER: Want to pull this information from the database
    this.state = {
      pic_src: "../stock_image.png",
      desc: "This item describes an item, which can be used for items and various item-related accessories",
      status: "Rented",
      posted: "21/10/2016",
      expires: "21/10/2017",
      category: "Bread",
      owner: "Greg",
      rate: 3.09
    }
  }

  render() {
    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    };

    let statusText = null;
    if (this.state.status === "Rented") {
      status = "This item has already been rented out.";
    }
    else if (this.state.status === "Available") {
      status = "This item is still available to be rented.";
    }
    else {
      status = "The status of this item could not be determined.";
    }

    let duration =
      moment.duration(
        moment(posted,"DD/MM/YYYY").diff(moment(expires,"DD/MM/YYYY"));
      ).format("hh:mm:ss");

    return (
      <View style={style}>
        <Image source={{ uri: this.state.pic_src }}
               style={width=20, height=20}/>

        <Text style={fontWeight: 'bold'}>Description:</Text>
        <Text>{`${this.state.desc}`}</Text>
        <Text>{`(Posted under ${this.state.category})`}</Text>

        <Text style={fontWeight: 'bold'}Status:</Text>
        <Text>{`${this.statusText}`}</Text>

        <Text>{`Remaining duration for this item: ${this.duration}`}</Text>
        <Text>{`(Posted on ${this.state.posted}, by ${this.state.owner}: expires ${this.state.expiration})`}</Text>

        <Text>{`Location: ${this.state.location}`}</Text>

        <Button title=`Rent this item: $${this.state.rate}/hour`,
                onPress={() => {
                  alert("Are you sure you want to rent this item?")
                }
              }/>
      </View>
    );
  }
}
