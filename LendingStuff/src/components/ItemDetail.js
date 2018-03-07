import React from 'react';
import { Text, View, Button, TextInput, Image } from 'react-native';

export default class ItemDetail extends React.Component {

  render() {
    const { item } = this.props;

    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    };

    //Placeholder: will change once we know format of stored dates
    let duration = 0;
    let itemTitle = "Rent this item: $" + item.rate + "hour";

    let statusText = null;
    let rentComp = null;

    if (item.rented) {
      statusText = "This item has already been rented out.";
      rentComp = <Text>Cannot rent this item.</Text>;
    }
    else {
      statusText = "This item is still available to be rented.";
      rentComp = <Button title={itemTitle}
              onPress={() => {
                alert("Are you sure you want to rent this item?")
              }
      }/>;
    }

    return (
      <View style={style}>
        <Image source={{ uri: item.image }}
               style={width=20, height=20}/>

        <Text style={{fontWeight: "bold"}}>Description of {item.name}:</Text>
        <Text>{item.desc}</Text>
        <Text>Posted under {item.category}</Text>

        <Text style={{fontWeight: "bold"}}>Status:</Text>
        <Text>{statusText}</Text>

        <Text style={{fontWeight: "bold"}}>Remaining duration for this item: {duration}</Text>
        <Text>Posted on {item.postedOn} by {item.owner}: </Text>
        <Text>Expires on {item.expiresOn}</Text>

        <Text><Text style={{fontWeight: "bold"}}>Location:</Text> {item.location}</Text>
        {rentComp}
      </View>
    );
  }
}
