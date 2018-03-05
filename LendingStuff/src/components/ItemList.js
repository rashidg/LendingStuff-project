import React from 'react';
import { Text, View } from 'react-native';

export default class ItemList extends React.Component {
    //Currently mapping items to item.name, but was items->item:
    //Can be changed if we want to provide more info
    render() {
        const { items } = this.props;

        return (
          <View>
              {items.map((item, idx) => (<Text key={idx}>{item.name}</Text>))}
          </View>
        );
    }
}
