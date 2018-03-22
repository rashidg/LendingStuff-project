import React from 'react';
import { connect } from 'react-redux'
import { Text, View, Button, TextInput, Image, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import { updateRentedItem, createTransaction } from '../actions';


class ItemDetail extends React.Component {

  render() {
    const { item, dispatch } = this.props;

    //Placeholder: will change once we know format of stored dates
    let duration = 0;
    let itemTitle = "Rent this item: $" + item.rate + "hour";

    let statusText = null;
    let rentComp = null;

    if (item.rented) {
      statusText = "This item has already been rented out.";
      rentComp = <Text>Cannot rent this item.</Text>;
    }
    else {
      statusText = "This item is still available to be rented.";
      rentComp = <Button title={itemTitle}
              onPress={() => {
                dispatch(updateRentedItem(item.id));
                dispatch(createTransaction(item.id, "renter"));
                Actions.popTo('itemList');
              }
      }/>;
    }

    const renderInline = (title, text) => (
      <View style={styles.inline}>
        <Text style={styles.heading}>{title}:</Text>
        <Text>{text}</Text>
      </View>
    );

    return (
      <View style={styles.container} >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: 20, alignItems: 'center'}}>
            <Image source={require('../image/boo.png')} />
          </View>

          {renderInline('Name', item.name)}
          {renderInline('Category', item.category)}

          <View style={{paddingTop: 5, paddingBottom: 5}}>
            <Text style={styles.heading}>Description :</Text>
            <Text>{item.desc}</Text>
          </View>

          {renderInline('Owner', item.owner)}
          {renderInline('Expiry', moment().to(moment(item.postedOn)))}
          {renderInline('Location', item.location)}
        </ScrollView>
        { !item.rented &&
          <View style={styles.submit}>
            {rentComp}
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: "5%"
  },
  heading: {
    fontSize: 16,
    paddingRight: 5,
    color: 'grey'
  },
  text: {
    paddingBottom: 20
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  submit: {
    backgroundColor:'#2f3699',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent'
  }
});


export default connect()(ItemDetail);
