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
      expiration: "21/10/2017",
      category: "Baked Goods",
      owner: "Greg",
      location: "Bob's Pizzeria",
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
      statusText = "This item has already been rented out.";
    }
    else if (this.state.status === "Available") {
      statusText = "This item is still available to be rented.";
    }
    else {
      statusText = "The status of this item could not be determined.";
    }

    //Placeholder: will change once we know format of stored dates
    let duration = 0;
    let itemTitle = "Rent this item: $" + this.state.rate + "hour";

    return (
      <View style={style}>
        <Image source={{ uri: this.state.pic_src }}
               style={width=20, height=20}/>

        <Text style={{fontWeight: "bold"}}>Description:</Text>
        <Text>{this.state.desc}</Text>
        <Text>Posted under {this.state.category}</Text>

        <Text style={{fontWeight: "bold"}}>Status:</Text>
        <Text>{statusText}</Text>

        <Text style={{fontWeight: "bold"}}>Remaining duration for this item: {duration}</Text>
        <Text>Posted on {this.state.posted} by {this.state.owner}: </Text>
        <Text>Expires on {this.state.expiration}</Text>

        <Text><Text style={{fontWeight: "bold"}}>Location:</Text> {this.state.location}</Text>

        <Button title={itemTitle}
                onPress={() => {
                  alert("Are you sure you want to rent this item?")
                }
              }/>
      </View>
    );
  }
}
