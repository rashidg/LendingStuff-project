import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';

import Item from './Item';
import { fetchItems } from '../actions';
import { Actions } from 'react-native-router-flux';

class SearchResults extends React.Component {
  componentDidMount(){
    const { dispatch, query } = this.props;
    dispatch(fetchItems(query));
  }

  renderItem(item){
    const status = item.rented ? "Rented" : "Available";
    return <Item key={item.id}
                 title={item.name}
                 description={item.desc}
                 infoBox2={"$" + item.rate}
                 statusBox={status}
                 onPress={() => {Actions.itemDetail({item})}} />;
  }

  render() {
    const { items, isFetching } = this.props;

    const renderItems = items.map(this.renderItem);

    return (
      <View>
        <ActivityIndicator size='large'
                           animating={isFetching} />
        {renderItems.length &&
          <ScrollView>
            {renderItems}
          </ScrollView>
          ||
          <View>
            <Text>No items appeared: try to broaden the search parameters.</Text>
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items.data,
  isFetching: state.items.isFetching
});

export default connect(mapStateToProps)(SearchResults);
