import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


export default class Item extends React.Component {

  render() {
    const {
      item,
      view,
      title,
      description,
      infoBox1,
      infoBox2,
      statusBox,
      onPress
    } = this.props;

    return (
      <TouchableOpacity style={styles.container}
                        onPress={onPress}>
        <Image style={styles.image}
               source={require('../image/boo.png')} />
        <View style={styles.info}>

          <View style={styles.info__text}>
            <Text numberOfLines={1}
                  style={styles.item__name}>
              {title}
            </Text>
            <Text numberOfLines={3}
                  style={{flex: 1, color: "#5f5f5f"}}>
              {description}
            </Text>
          </View>

          <View style={styles.info__bottom}>

            {this.renderInfoBox(infoBox1)}
            {this.renderInfoBox(infoBox2)}

            <View style={[styles.badge, {width: '40%', backgroundColor: '#7b37ba'}]}>
              <Text style={styles.badge__text}>
                {statusBox}
              </Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    )
  }

  renderInfoBox(infoBox) {
    if (infoBox)
      return (
        <View style={styles.badge}>
          <Text style={styles.badge__text}>{infoBox}</Text>
        </View>
      );
    return <View style={[styles.badge, {opacity: 0}]} />
  }
}

Item.defaultProps = {
  //Should be dummyItem.name and dummyItem.desc: not imported
  title: "Appliance",
  description: "For kitchen use",
  onPress: () => { alert("hello") }
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 150,
    backgroundColor: '#fff',
    borderColor: '#2e3681',
    borderRadius: 15,
    borderWidth: 1,
    margin: 5,
  },
  image: {
    alignSelf: 'center',
    width: 130,
    height: 130,
    marginLeft: 10,
    borderRadius: 15,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: '#fff',
    height: 130,
    margin: 10,
  },
  info__text: {
    height: '70%'
  },
  item__name: {
    margin: 0,
    fontSize: 18,
    color: '#000',
    marginBottom: 2,
  },
  info__bottom: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: '30%',
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f3699',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    margin: 1,
    width: '30%',
  },
  badge__text: {
    color: '#fff',
    fontSize: 18,
  }
});
