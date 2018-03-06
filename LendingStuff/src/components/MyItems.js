import React from 'react';
import { Text, View, ScrollView, Button, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';

import Item from './Item';

export default class MyItems extends React.Component {
  constructor(props) {
    super(props);
    //PLACEHOLDER: Want to pull this information from the database
    this.state = {
      itemList: [
        {
          category: "chargers",
          name: "Macbook 85W Charger",
          desc: "It is compatible with 15 inch Macbooks",
          rented: true,
          location: "Toronto, ON",
          postedOn: "2018-03-02",
          expiresOn: "2018-03-22",
          rate: 15,
          owner: "lender",
          image: "resource/boo.png"
        },
        {
          category: "chargers",
          name: "Macbook 65W Charger",
          desc: "Magsafe 2 charger",
          rented: false,
          location: "Toronto, ON",
          postedOn: "2018-03-02",
          expiresOn: "2018-03-22",
          rate: 15,
          owner: "lender",
          image: "resource/boo.png"
        },
        {
          category: "home products",
          name: "29pc Imperial Cobalt Drill Bit Set",
          desc: "29pc Imperial Cobalt Drill Bit Set for Stainless Steel",
          rented: true,
          location: "Toronto, ON",
          postedOn: "2018-03-02",
          expiresOn: "2018-03-22",
          rate: 10,
          owner: "lender",
          image: "resource/boo.png"
        },
        {
          category: "home products",
          name: "Screwdriver Set (6-Piece)",
          desc: "All screwdrivers are flathead",
          rented: false,
          location: "Toronto, ON",
          postedOn: "2018-03-02",
          expiresOn: "2018-03-22",
          rate: 5,
          owner: "lender",
          image: "resource/boo.png"
        },
        {
          category: "home products",
          name: "17 Piece Smart Phone Tool Kit",
          desc: "5-point star penta lobe bits, and 2-in-1 fine tip tweezers-magnifier",
          rented: false,
          location: "Toronto, ON",
          postedOn: "2018-03-02",
          expiresOn: "2018-03-22",
          rate: 5,
          owner: "lender",
          image: "resource/boo.png"
        }
      ]
    }
  }

  renderItem(item, idx) {
    const status = item.rented ? 'Rented' : "Available";
    return <Item key={"item" + idx}
                 title={item.name}
                 description={item.desc}
                 infoBox2={"$" + item.rate}
                 statusBox={status} />;
  }

  render() {
    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    };

    return(
      <View style={style}>
        <Text style={{fontWeight: 'bold'}}>My Items:</Text>
        <ScrollView>
          {
            this.state.itemList.map(this.renderItem)
          }
        </ScrollView>
      </View>
    );
  }
}
