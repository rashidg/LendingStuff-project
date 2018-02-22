import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, TextInput, Image } from 'react-native';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* Source of the image associated with this post */
      pic_src: "../stock_image.png",

      /* Text fields for description, duration, location and rate */
      desc: "",
      dur: 0,
      meetLoc: "",
      rate: 0,

      /* Item categories, and the index of the one selected */
      categories: ["Phone Chargers", "Textbooks", "Yachts", "Chihuahuas"],
      categoryIdx: 0
    };
  }

  /* Placeholder: need to implement image uploading */
  replaceImage() {
  }

  render() {
    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    };

    return (
      <View style={style}>
        {/* Current image, and option to upload a new one */}
        <Image source={{ uri: this.state.pic_src }}
               style={width=50, height=50}/>
        <Button title="Upload a new image"
                onPress={() => {this.replaceImage();}}/>

        {/* For each category (and its index in the list), create a Button
            to select category. The current category is highlighted with ~.*/}
        {
        this.state.categories.map(
          (key, index) =>
          {
            if (index === this.state.categoryIdx) {
              return <Button title={"~" + String(key) + "~"}
                      onPress={() => this.setState({categoryIdx: index})} />
            }
            else {
              return <Button title={String(key)}
                      onPress={() => this.setState({categoryIdx: index})} />
            }
          }
        )
        }

        {/* Text boxes to input (and read) desc, dur, loc, and rate */}
        <Text>Description:</Text>
        <TextInput
          style={{height: 50, width: 200}}
          placeholder="Write an item description:"
          onChangeText={(text) => this.setState({desc: text})} />

        <Text>Duration:</Text>
        <TextInput
          style={{height: 50, width: 200}}
          placeholder="Enter the duration (in hours):"
          onChangeText={(text) => {
            if (parseInt(text) != NaN) {
              this.setState({dur: parseInt(text)});
            }
          }}/>

        <Text>Meeting_location:</Text>
        <TextInput
          style={{height: 50, width: 200}}
          placeholder="Enter the meeting location:"
          onChangeText={(text) => this.setState({meetLoc: text})} />

        <Text>Hourly_rate:</Text>
        <TextInput
          style={{height: 50, width: 200}}
          placeholder="Enter the the hourly rate (in $):"
          onChangeText={(text) => {
            if (parseInt(text) != NaN) {
              this.setState({rate: parseInt(text)});
            }
          }}/>
      </View>
    );
  }
}

/* Export props associated with a Post */
export default connect(
  (state) => {
    return {
      pic_src: state.pic_src,
      desc: state.desc,
      dur: state.dur,
      meetLoc: state.meetLoc,
      rate: state.rate,
      categories: state.categories,
      categoryIdx: state.categoryIdx
    };
  }
)(Post);
