import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, ActivityIndicator } from 'react-native';

import Item from './Item';
import { fetchItems } from '../actions';

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
                 statusBox={status} />;
  }

  render() {
    const { items, isFetching } = this.props;
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
}

const mapStateToProps = (state) => ({
  items: state.items.data,
  isFetching: state.items.isFetching
});

export default connect(mapStateToProps)(SearchResults);
