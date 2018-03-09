import React from 'react';
import { Text, View, Button, TextInput, Image, Slider } from 'react-native';

export default class ItemDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      duration: 6
    };
  }

  render() {
    const style = {
      flex: 1,
      backgroundColor: '#fff',
			padding: '5%'
    };

    const { item } = this.props;

    //Placeholder: will change once we know format of stored dates
    let duration = 20;

    let statusText = null;
    let durationText = null;
    let durationSlider = null;
    let rentComp = null;

    if (item.rented) {
      statusText = "This item has already been rented out.";
    }
    else {
      let itemTitle = "Rent this item: $" + item.rate + " per hour";
      statusText = "This item is still available to be rented.";
      rentComp = <Button title={itemTitle}
              onPress={() => {
                alert("Are you sure you want to rent this item? "
                  + "\nDuration: " + this.state.duration + " hours."
                  + "\nThis will cost $" + (this.state.duration * item.rate) + " in total.")
              }
      }/>;
      durationText = <Text style={{fontSize: 20, textAlign: 'center'}}>Rent for: {this.state.duration} hours</Text>;
      durationSlider = <Slider style={{ width: 300 }}
              step={1}
              minimumValue={0}
              maximumValue={50}
              value={this.state.duration}
              onSlidingComplete={(result) => this.setState({duration: result})} />;
    }

    return (
      <View style={style}>
        <Image source={{ uri: item.image }}
               style={width=20, height=20}/>

        <Text style={{fontWeight: 'bold'}}>Description of {item.name}:</Text>
        <Text>{item.desc}</Text>
        <Text style={{fontStyle: 'italic'}}>(Posted under {item.category}) {"\n"}</Text>

        <Text style={{fontWeight: "bold"}}>Remaining duration for this item: {duration} hours.</Text>
        <Text>Posted on {item.postedOn} by {item.owner}: </Text>
        <Text>Expires on {item.expiresOn} {"\n"}</Text>

        <Text><Text style={{fontWeight: "bold"}}>Location:</Text> {item.location} {"\n"}</Text>
        <Text>{statusText} {"\n"}</Text>
        {!item.rented && rentComp}
        {!item.rented && durationText}
        {!item.rented && durationSlider}
      </View>
    );
  }
}
