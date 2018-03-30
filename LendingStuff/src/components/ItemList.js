import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';

import Item from './Item';
import { fetchItems } from '../actions';
import { Actions } from 'react-native-router-flux';

class ItemList extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchItems());
  }

  renderItem(item){
    const status = item.rented ? "Rented" : "Available";
    return <Item key={item.id}
                 title={item.name}
                 description={item.desc}
                 imgUrl={item.imgUrl}
                 infoBox1={item.distance + "km"}
                 infoBox2={"$" + item.rate}
                 statusBox={status}
                 onPress={() => {Actions.itemDetail({item})}} />;
  }

  handleFilter(){
    Actions.search({
      updateQuery: (query) => this.props.dispatch(fetchItems(query))
    });
  }

  render() {
    const { items, isFetching } = this.props;

    const renderItems = items.map(this.renderItem);

    if (!renderItems.length && !isFetching) {
      return (
        <View style={{backgroundColor: 'white', height: '100%'}}>
          <Text>No items appeared: try to broaden the search parameters.</Text>
        </View>
      );
    }

    if (isFetching) {
      return (
        <View style={{backgroundColor: 'white', height: '100%'}}>
          <ActivityIndicator size='large'
                             animating={isFetching}
                             style={{paddingTop: 20}}/>
        </View>
      );
    }

    const filterButton = (
      <View style={{alignItems: 'center', justifyContent: 'center', height: 25, marginTop: 5}}>
        <TouchableOpacity onPress={this.handleFilter.bind(this)}>
          <Text style={{ textAlign: 'center',
                         color:'#0099ff',
                         borderRadius: 10,
                         borderWidth: 1,
                         borderColor: '#0099ff',
                         width: 75}}>
            Filter
          </Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={{backgroundColor: 'white', height: '100%'}}>
        {filterButton}
        <ScrollView>
          {renderItems}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items.data,
  isFetching: state.items.isFetching
});

export default connect(mapStateToProps)(ItemList);
