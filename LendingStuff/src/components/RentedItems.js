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
    const { items, isFetching, username, user } = this.props;

    const renderItems = items.map(this.renderItem);

    if (!renderItems.length && !isFetching) {
      return (
        <View style={{backgroundColor: 'white', height: '100%'}}>
          <Text>You ({user.displayName}) have not posted any items.</Text>
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

    return (
      <View style={{backgroundColor: 'white', height: '100%'}}>
        <ScrollView showsVerticalScrollIndicator={true}>
          {renderItems}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items.data,
  isFetching: state.items.isFetching,
  user: state.auth.user
});

export default connect(mapStateToProps)(RentedItems);
