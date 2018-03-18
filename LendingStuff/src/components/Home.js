import React from 'react';
import { Button, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';


import { connect } from 'react-redux';
import { register, createUser, login } from '../actions';


class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onLoginError = this.onLoginError.bind(this);
    this.onRegistrationSuccess = this.onRegistrationSuccess.bind(this);
    this.onRegistrationError = this.onRegistrationError.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  onSubmit() {
    const data = this.state;
    // this.props.register(data, this.onSuccess, this.onError)
    this.props.login(data, this.onSuccess, this.onLoginError);
  }

  onSuccess(user) {
    alert('login successful');
    console.log(user);
    // this.props.createUser(user, function() { alert('create user successful '); }, function(err) { alert('error'); console.log(err); });
  }

  onRegister() {
    const data = this.state;

    this.props.register(data, this.onRegistrationSuccess, this.onRegistrationError);
  }

  onRegistrationSuccess(user){
    //this.props.createUser(user, function() {alert('create user successful'); console.log(user) }, function(err) {alert('error'); console.log(err);
    //});
    alert('registration successful');
    console.log(user);
  }

  onRegistrationError(err) {
    alert('register unsuccessful');
    console.log(err);
  }

  onLoginError(err) {
    alert('loggin unsuccessful');
    console.log(err);
  }

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
        <Text style={textStyle}>Email</Text>
            <TextInput style={{height: 50, width: 300, textAlign: 'center'}}
                       placeholder="Email"
                       onChangeText={(text) => this.setState({email: text})}/>
        <Text style={textStyle}>Password</Text>
            <TextInput style={{height: 50, width: 300, textAlign: 'center'}}
                       placeholder="Passowrd"
                       secureTextEntry={true}
                       onChangeText={(text) => this.setState({password: text})}/>
        <Button title="Login!"
                onPress={ () => {this.onSubmit()}} />
        <Button title="Register!"
                onPress={ () => {this.onRegister()}} />
      </KeyboardAvoidingView>
    );
  }
}

export default connect(null, { register, createUser, login })(Home);