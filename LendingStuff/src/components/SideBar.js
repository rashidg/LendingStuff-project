import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Actions} from "react-native-router-flux";

const username = "lender";

export default class SideBar extends React.Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.profile}>
            <View style={styles.image_holder}>
              <Image style={styles.image}
                     source={require('../image/man.png')} />
            </View>
            <Text style={styles.username}>{username}</Text>
          </View>

        <ScrollView>
          <TouchableOpacity style={styles.nav_item}
                            onPress={ () => {Actions.search();}}>
            <Image style={styles.nav_icon}
                   source={require('../image/search.png')} />
            <Text style={styles.nav_title}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nav_item}
                            onPress={ () => {
                              Actions.myItems({username});
                            }
                          }>
            <Text style={styles.nav_title}>My Items</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nav_item}
                            onPress={ () => {
                              Actions.rentedItems({username: 'renter'});
                            }
                          }>
            <Text style={styles.nav_title}>Rented Items</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nav_item}
                            onPress={ () => {Actions.post();}}>
            <Image style={styles.nav_icon}
                   source={require('../image/upload.png')} />
            <Text style={styles.nav_title}>Post Items</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nav_item}
                            onPress={ () => {alert('account');}}>
            <Image style={styles.nav_icon}
                   source={require('../image/settings.png')} />
            <Text style={styles.nav_title}>Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
    // alignItems: 'stretch',
  },
  profile: {
    flexDirection: 'column',
    height: 225,
    backgroundColor: '#0b0825',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    height: 125,
    width: 125,
    marginTop: 7.5,
    backgroundColor: '#fff',
    borderRadius: 62.5,
  },
  image_holder: {
    alignSelf: 'center',
    height: 140,
    width: 140,
    backgroundColor: 'transparent',
    borderRadius: 70,
    borderColor: '#fff',
    borderWidth: 1,
  },
  username: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 3,
    marginTop: 10,
    color: '#2a2a2a',
  },
  nav_item: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#0b0825',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  nav_title: {
    padding: 15,
    fontSize: 15,
    color: '#4d4d4d'
  },
  nav_icon: {
    marginLeft: 15,
    marginRight: 5,
    height: 20,
    resizeMode: 'contain',
  }
});
