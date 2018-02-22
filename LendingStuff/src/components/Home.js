import React from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import SortBar from './SortBar';

class Home extends React.Component {
  render() {

    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <View style={style}>
        <SortBar />
        <Button
          title="Go to Items"
          onPress={ () => {Actions.items();} }
        />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    ...state,
    list: state.items.items
  })
)(Home);