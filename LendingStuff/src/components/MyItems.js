import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';

import Item from './Item';
import { fetchMyItems } from '../actions';
import { Actions } from 'react-native-router-flux';

class MyItems extends React.Component {
  componentDidMount(){
    const { dispatch, username } = this.props;
    dispatch(fetchMyItems(username));
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
            <Text>You ({username}) have not posted any items!</Text>
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

export default connect(mapStateToProps)(MyItems);
