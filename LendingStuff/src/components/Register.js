import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, TextInput, KeyboardAvoidingView } from 'react-native';

import { register, login } from '../actions';


class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      loggedIn: ""
    };
  }

  render() {
    const { dispatch } = this.props;

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
                       autoCapitalize="none"
                       placeholder="Username"
                       onChangeText={(text) => this.setState({username: text})}/>
        <Text style={textStyle}>Email</Text>
            <TextInput style={{height: 50, width: 300, textAlign: 'center'}}
                       autoCapitalize="none"
                       placeholder="Email"
                       onChangeText={(text) => this.setState({email: text})}/>
        <Text style={textStyle}>Password</Text>
            <TextInput style={{height: 50, width: 300, textAlign: 'center'}}
                       placeholder="Passowrd"
                       secureTextEntry={true}
                       onChangeText={(text) => this.setState({password: text})}/>
        <Button title="Register!"
                onPress={ () => dispatch(register(this.state)) } />
      </KeyboardAvoidingView>
    );
  }
}

export default connect(null)(Register);