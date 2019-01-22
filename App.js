import React from 'react';
import { StyleSheet, Text, ActivityIndicator, Alert, View, NetInfo, Switch} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Icon, Button} from 'native-base';
import { createStackNavigator } from 'react-navigation';
import AddSerialScreen from './components/AddSerialScreen';
import MainScreen from './components/MainScreen';
import Barcode from './components/Barcode';
import AddCompanyScreen from './components/AddCompanyScreen';
import SearchCompanyScreen from './components/SearchCompanyScreen';
import SearchCompanyScreenInvoice from './components/SearchCompanyScreenInvoice';
import SearchInvoiceScreen from './components/SearchInvoiceScreen';
import SearchInvoiceScreenInvoice from './components/SearchInvoiceScreenInvoice';
import AddInvoiceScreen from './components/AddInvoiceScreen';
import InputScreen from './components/InputScreen';
import AddSerialBarcodeScreen from './components/AddSerialBarcodeScreen';
import SearchSerial from './components/SearchSerial';
import ShowSerial from './components/ShowSerial';
import SerialSearchBarcode from './components/SerialSearchBarcode';
import EditSerial from './components/EditSerial';
import firebase from './Firebase'



const RootStack = createStackNavigator(
  {
    Main: MainScreen,
    AddSerial: AddSerialScreen,
    AddCompany: AddCompanyScreen,
    AddInvoice: AddInvoiceScreen,
    SearchCompany: SearchCompanyScreen,
    SearchCompanyInvoice: SearchCompanyScreenInvoice,
    SearchInvoice: SearchInvoiceScreen,
    SearchInvoiceInvoice: SearchInvoiceScreenInvoice,
    Barcode: Barcode,
    InputScreen: InputScreen,
    AddSerialBarcodeScreen : AddSerialBarcodeScreen,
    SearchSerial: SearchSerial,
    SerialSearchBarcode: SerialSearchBarcode,
    ShowSerial: ShowSerial,
    EditSerial: EditSerial,   

  },
  {
    initialRouteName: 'Main',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#006064',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      headerBackTitle: null,
    },
  },
);



export default class App extends React.Component {

constructor(props){
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state={
      email: '',
      password: '',
      isLoading: true,
      authenticated: "",
      connection_Status : "",
      showPassword: true
    }
  }
 
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log("Login Successfull");
        this.setState({ 
          authenticated: true
        });
      } else {
        console.log("Login Failed");
        this.setState({ 
          isLoading: false,
          authenticated: false
        });
      }
    });

    NetInfo.isConnected.addEventListener(
        'connectionChange',
        this._handleConnectivityChange
 
    );
   
    NetInfo.isConnected.fetch().done((isConnected) => {
 
      if(isConnected == true)
      {
        this.setState({connection_Status : "Online"})
      }
      else
      {
        this.setState({connection_Status : "Offline"})
      }
 
    });
  }
  
 
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this._handleConnectivityChange
 
    );
 
  }

  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
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
 
  _handleConnectivityChange = (isConnected) => {
 
    if(isConnected == true)
      {
        this.setState({connection_Status : "Online"})
      }
      else
      {
        this.setState({connection_Status : "Offline"})
      }
  };

  render() {
    if(this.state.connection_Status == 'Offline')
    return(
        <View style={styles.activity}>
        <Text style={{
                                paddingLeft: 15,
                               paddingRight: 15,
                               paddingTop: 15,
                               paddingBottom: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                 fontSize: 15
                             }}>Opps! No Internet Connection.</Text>
        <Text style={{
                                paddingLeft: 15,
                               paddingRight: 15,
                               paddingTop: 15,
                               paddingBottom: 15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                 fontSize: 15
                             }}>Close the App or Check Internet Connection.</Text>  
        </View>    
    )
    
    if (this.state.authenticated) {
      return <RootStack />;
    }
    
    
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
          <Text style={{paddingTop: 7, paddingBottom: 7, fontSize: 13}}>Verifying User</Text>
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
                               paddingBottom: 0,
                               marginTop: 95
                           }}>

        <Form style={{
                               paddingTop: 0,
                               paddingBottom: 10
                           }}>


        <Label style={{color: 'blue', fontWeight: 'bold', fontSize: 18, textAlign:'center', marginBottom: 20, marginTop: 95}}>Login With Email</Label>              

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
                secureTextEntry={this.state.showPassword}
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

         <Button rounded block transparent>
          <Label style={{color: 'black', fontSize: 14}}>Show Password</Label>
              <Switch
              onValueChange={this.toggleSwitch}
              value={!this.state.showPassword}
          />  
          </Button>


        <View style={{
                               paddingLeft: 35,
                               paddingRight: 35,
                               paddingTop: 0,
                               paddingBottom: 0
                           }}>
         <Button rounded block success onPress={() => this.loginuser(this.state.email, this.state.password)}>
           <Label style={{color: 'white', fontSize: 17}}>Login</Label>
          </Button>

        </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activity: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});