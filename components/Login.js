import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Alert, View } from 'react-native';
import { Container, Content, Form, Item, Input, Text, Label, Button } from 'native-base';
import firebase from '../Firebase';

export default class Login extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Login',
      }
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false
    };
  }


  stringtInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  loginuser = (email, password) => {
    if (this.state.email == '' || this.state.password == '' ) {
      Alert.alert("Please Enter Login Details");
    } else {
     this.setState({
       isLoading: true,
     });
    firebase.auth().signInWithEmailAndPassword(email, password).then(function (user)  {
         console.log(user)
         {
            Alert.alert('Login Successfull', '',
      [
        {text: 'Ok', onPress: () => console.log('Login Successfull')},
      ],
      { cancelable: false });
          }
    }).catch((error) => {

      console.log(error.toString());
      {
            Alert.alert('Wrong User Details', '',
      [
        {text: 'Please Check', onPress: () => console.log('Wrong User Details'), style: 'cancel'},
      ],
      { cancelable: false });
      }

      this.setState({
       isLoading: false,
     });

    });
    }
    
  }
  

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
          <Text style={{paddingTop: 7, paddingBottom: 7, fontSize: 13}}>Logging</Text>
        </View>
      )
    }

    return (
     
      <Container>
      
        <Content style={{
                               paddingLeft: 7,
                               paddingRight: 7,
                               paddingTop: 3,
                               paddingBottom: 0
                           }} keyboardShouldPersistTaps={'handled'} style= {{ flex: 1}}>     
           <View style={{
                               paddingLeft: 15,
                               paddingRight: 15,
                               paddingTop: 10,
                               paddingBottom: 0
                           }}>

         <Form style={{
                               paddingTop: 0,
                               paddingBottom: 10
                           }}>


        <Label style={{color: 'blue', fontWeight: 'normal', fontSize: 12, textAlign:'center', marginBottom: 10, marginTop: 75}}>Login With Email</Label>              

         <Item rounded style={{
                                borderColor: '#00BFA5'
                           }}>
              <Input 
                placeholder="Enter Email"
                value={this.state.email}
                autoCapitalize='none'
                onChangeText={(text) => this.stringtInput(text, 'email')}
                autoFocus={true}
                style={{
                                 paddingLeft: 15,
                                 paddingRight: 15,
                                 paddingTop: 0,
                                 paddingBottom: 0,
                                 color: 'gray',
                                 fontSize: 15,
                                 textAlign:'center',
                                 fontWeight: 'bold'
                             }}/>

            </Item>

            <Item rounded style={{
                                marginTop: 10,
                                borderColor: '#00BFA5'
                           }}>
              <Input 
                placeholder="Enter Password"
                value={this.state.password}
                secureTextEntry={true}
                style={styles.default}
                autoCapitalize='none'
                password={true}
                onChangeText={(text) => this.stringtInput(text, 'password')}
                style={{
                                 paddingLeft: 15,
                                 paddingRight: 15,
                                 paddingTop: 0,
                                 paddingBottom: 0,
                                 color: 'gray',
                                 fontSize: 15,
                                 textAlign:'center',
                                 fontWeight: 'bold'
                             }}/>

            </Item>  

          </Form>
        </View>  
        <View style={{
                               paddingLeft: 35,
                               paddingRight: 35,
                               paddingTop: 0,
                               paddingBottom: 0
                           }}>
         <Button rounded block info onPress={() => this.loginuser(this.state.email, this.state.password)}>
           <Label style={{color: 'white', fontSize: 17}}>Login</Label>
          </Button>

           <Button rounded block transparent dark onPress={() => this.props.navigation.navigate('Main')} style={{ marginTop: 10  }}>
           <Label style={{color: 'blue', fontSize: 17}}>Go Home</Label>
          </Button>

        </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
