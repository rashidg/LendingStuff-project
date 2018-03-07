import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';

import Item from './Item';
import { fetchRentedItems } from '../actions';
import { Actions } from 'react-native-router-flux';

class RentedItems extends React.Component {
  componentDidMount(){
    const { dispatch, username } = this.props;
    dispatch(fetchRentedItems(username));
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
    const { items, isFetching, username } = this.props;

    if (items != null) {
      const renderItems = items.map(this.renderItem);

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
      return (
        <View>
          <Text>You ({username}) have not rented any items!</Text>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  items: state.items.data,
  isFetching: state.items.isFetching
});

export default connect(mapStateToProps)(RentedItems);
