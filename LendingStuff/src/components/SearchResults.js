import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, ActivityIndicator } from 'react-native';

import Item from './Item';
import { fetchItems } from '../actions';
import { Actions } from 'react-native-router-flux';

class SearchResults extends React.Component {
  componentDidMount(){
    const { dispatch } = this.props;
    dispatch(fetchItems());
  }

  renderItem(item, idx){
    const status = item.rented ? "Rented" : "Available";
    return <Item key={"item" + idx}
                 title={item.name}
                 description={item.desc}
                 infoBox2={"$" + item.rate}
                 statusBox={status}
                 onPress={() => {Actions.itemDetail({item})}} />;
  }

  render() {
    const { items, isFetching } = this.props;
    const renderItems = items.map(this.renderItem);

    if (items != null) {
      return (
        <View sytle={{paddingTop: '10%'}}>
          <ActivityIndicator size='large'
                             animating={isFetching} />
          <ScrollView>
            {renderItems}
          </ScrollView>
        </View>
      );
    }
    else {
      <View>
        <Text>No search results found!</Text>
      </View>
    }
  }
}

const mapStateToProps = (state) => ({
  items: state.items.data,
  isFetching: state.items.isFetching
});

export default connect(mapStateToProps)(SearchResults);
