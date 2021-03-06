import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';

import Item from './Item';
import { fetchMyItems } from '../actions';
import { Actions } from 'react-native-router-flux';

class MyItems extends React.Component {
  componentDidMount(){
    const { dispatch, user } = this.props;
    dispatch(fetchMyItems(user.email));
  }

  renderItem(item, idx){
    if (item.rented) status = "Rented";
    else if (item.requested) status = "Requested";
    else status = "Available";

    return <Item key={"item" + idx}
                 title={item.name}
                 description={item.desc}
                 imgUrl={item.imgUrl}
                 infoBox1={item.distance + "km"}
                 infoBox2={"$" + item.rate}
                 statusBox={status}
                 onPress={ () => {Actions.itemDetail({item})} } />;
  }

  render() {
    const { items, isFetching, user } = this.props;

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

export default connect(mapStateToProps)(MyItems);
