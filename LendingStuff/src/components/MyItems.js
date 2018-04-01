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
    const status = item.rented ? "Rented" : "Available";
    return <Item key={"item" + idx}
                 title={item.name}
                 description={item.desc}
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
  user: state.auth.user,
  items: state.items.data,
  isFetching: state.items.isFetching
});

export default connect(mapStateToProps)(MyItems);
