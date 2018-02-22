import React from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, TextInput } from 'react-native';

import ItemList from './ItemList';
import { fetchData } from '../actions';

class Items extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filteredItems: []
    };
  }

  componentDidMount() {
    this.setState({
      items: [],
      filteredItems: []
    });
  }

  handleSearch(text) {
    const filtered = this.props.items.filter(item => item.includes(text));
    this.setState({ filteredItems: filtered });
  }

  render() {
    const { dispatch, items } = this.props;

    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    };
    return (
      <View style={style}>
        <Button title="Fetch Data From DB"
                onPress={() => { dispatch(fetchData()); }} />
        <ItemList items={items} />
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

export default connect(
  (state) => {
    return {
      items: state.items.data
    };
  }
)(Items);
