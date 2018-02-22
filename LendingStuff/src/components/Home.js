import React from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';


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
        <Button
          title="Go to Items"
          onPress={ () => {Actions.items();} }
        />
        <Button
          title="Search for items"
          onPress={ () => {Actions.search();} }
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