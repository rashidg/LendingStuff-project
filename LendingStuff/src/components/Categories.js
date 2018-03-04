import React from 'react';
import { Text, View, Button } from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

/*
For each category (and its index in the list), create a Button
to select category. The current category is highlighted with ~.
*/

export default (props) => {
  const { categories, categoryIdx, onPress } = props;

  const renderedCats = categories.map((key, index) => {
    let title = String(key);

    return <RadioButton><Text>{title}</Text></RadioButton>
  });

  return (
    <View>
      <RadioGroup onSelect = {(index, value) => onPress(index)}>
        {renderedCats}
      </RadioGroup>
    </View>
  )

};
