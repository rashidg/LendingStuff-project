import React from 'react';
import { Text, View, Button } from 'react-native';
import RadioForm from 'react-native-radio-form';

/*
For each category (and its index in the list), create a Button
to select category. The current category is highlighted with ~.
*/

export default (props) => {
  const { categories, categoryIdx, onPress } = props;

  return (
    <RadioForm style={{ width: 300, height:40 }}
               dataSource={categories}
               itemShowKey="label"
               itemRealKey="label"
               circleSize={16}
               initial={1}
               formHorizontal={true}
               labelHorizontal={true}
               onPress={(index) => onPress(index)} />
  )

};
