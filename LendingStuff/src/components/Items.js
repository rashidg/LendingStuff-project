import React from 'react';
import { Text, View, TextInput } from 'react-native';

import ItemList from './ItemList';

export default class Items extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filteredItems: []
    };
  }

  componentDidMount() {
    this.setState({
      items: [
        "Macbook Charger",
        "Iphone Charger",
        "Android Charger"
      ],
      filteredItems: []
    });
  }

  handleSearch(text) {
    const filtered = this.state.items.filter((item) => {
      return item.includes(text);
    });
    this.setState({
      ...this.state,
      filteredItems: filtered
    });
  }

  render() {
    return (
      <View>
        <ItemList items={this.state.items} />
        <Text>Search:</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Type here!"
          onChangeText={(text) => this.handleSearch(text)} />
        <Text>Search Results:</Text>
        <ItemList items={this.state.filteredItems} />
      </View>
    );
  }
}


