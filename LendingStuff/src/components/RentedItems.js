import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';

import Item from './Item';

class RentedItems extends React.Component {

  renderItem(item, idx){
    const status = item.rented ? 'Rented' : "Available";
    return <Item key={"item" + idx}
                 title={item.name}
                 description={item.desc}
                 infoBox2={"$" + item.rate}
                 statusBox={status} />;
  }

  render() {
    const { items } = this.props;
    const renderItems = items.map(this.renderItem);

    return (
      <View>
        <ScrollView>
          {renderItems}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.items.data
});

export default connect(mapStateToProps)(RentedItems);
