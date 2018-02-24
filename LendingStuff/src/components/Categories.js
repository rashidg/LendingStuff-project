import React from 'react';
import { View, Button } from 'react-native';

/*
For each category (and its index in the list), create a Button
to select category. The current category is highlighted with ~.
*/

export default (props) => {
  const { categories, categoryIdx, onPress } = props;

  const renderedCats = categories.map((key, index) => {
    let title = String(key);
    if (index === categoryIdx)
      title = "~" + String(key) + "~";

    return <Button key={key}
                   title={title}
                   onPress={() => {onPress(index);}} />
  });

  return (
    <View>
      {renderedCats}
    </View>
  )
};