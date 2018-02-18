import React from 'react';
import { Text, View } from 'react-native';

export default class ItemList extends React.Component {
    render() {
        const { items } = this.props;

        return (
          <View>
              {items.map((item, idx) => (<Text key={idx}>{item}</Text>))}
          </View>
        );
    }
}