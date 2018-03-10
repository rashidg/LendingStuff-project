import React from 'react';
import { Button, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class Home extends React.Component {

  render() {
    const style = {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    };
    const textStyle = {
      fontSize: 20,
      textAlign: 'center'
    };
    return (
      <KeyboardAvoidingView behavior='padding'
                            keyboardVerticalOffset={70}
                            style={style}>
        <Text style={textStyle}>Username</Text>
            <TextInput style={{height: 50, width: 300, textAlign: 'center'}}
                       placeholder="Username" />
        <Text style={textStyle}>Password</Text>
            <TextInput style={{height: 50, width: 300, textAlign: 'center'}}
                       placeholder="Passowrd"
                       secureTextEntry={true}/>
        <Button title="Login!"
                onPress={ () => {Actions.search();}} />
      </KeyboardAvoidingView>
    );
  }
}
