import React from 'react';
import { Text, View, Button, TextInput, Image } from 'react-native';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    //PLACEHOLDER: Want to pull this information from the database
    this.state = {
      category: "chargers",
      name: "Macbook 85W Charger",
      desc: "It is compatible with 15 inch Macbooks",
      rented: true,
      location: "Toronto, ON",
      postedOn: "2018-03-02",
      expiresOn: "2018-03-22",
      rate: 15,
      owner: "lender",
      image: "resource/boo.png"
    }
  }

  render() {
    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    };

    let statusText = null;
    if (this.state.rented) {
      statusText = "This item has already been rented out.";
    }
    else {
      statusText = "This item is still available to be rented.";
    }

    //Placeholder: will change once we know format of stored dates
    let duration = 0;
    let itemTitle = "Rent this item: $" + this.state.rate + "hour";

    return (
      <View style={style}>
        <Image source={{ uri: this.state.image }}
               style={width=20, height=20}/>

        <Text style={{fontWeight: "bold"}}>Description of {this.state.name}:</Text>
        <Text>{this.state.desc}</Text>
        <Text>Posted under {this.state.category}</Text>

        <Text style={{fontWeight: "bold"}}>Status:</Text>
        <Text>{statusText}</Text>

        <Text style={{fontWeight: "bold"}}>Remaining duration for this item: {duration}</Text>
        <Text>Posted on {this.state.postedOn} by {this.state.owner}: </Text>
        <Text>Expires on {this.state.expiresOn}</Text>

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
