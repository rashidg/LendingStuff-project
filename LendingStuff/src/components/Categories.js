import React from 'react';
import { Picker } from 'react-native';


export default (props) => {
  const { categories, categoryIdx, onPress } = props;

  const items = categories.map((category, idx) => <Picker.Item key={idx + category}
                                                               label={category}
                                                               value={category} />);
  return (
    <Picker style={{position: 'relative'}}
            selectedValue={categories[categoryIdx]}
            onValueChange={(itemValue, itemIndex) => onPress(itemIndex)}>
      {items}
    </Picker>
  );
};
