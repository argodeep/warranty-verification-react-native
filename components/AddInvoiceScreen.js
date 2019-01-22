import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Alert, View } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Text, Button, Icon } from 'native-base';
import firebase from '../Firebase';

export default class AddInvoiceScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Invoice',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      company_name: '',
      invoice_no: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection("company").doc(JSON.parse(navigation.getParam('compkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        const serials = doc.data();
        this.setState({
          key: doc.id,
          company_name: serials.company_name,
          isLoading: false
        });
      } else {
        Alert.alert("Error While Fetching Company");
      }
    });
  }


  stringtInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }


  saveInvoice() {
    if(this.state.invoice_no == '')
    {
      Alert.alert("Please Enter Invoice No");
    }
    else {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    const invRef = firebase.firestore().collection("company").doc(this.state.key).collection("invoice");
    invRef.add({
      invoice_no: this.state.invoice_no,
    }).then((docRef) => {
      this.setState({
        invoice_no: this.state.invoice_no,
        isLoading: false,
      });
    //this.props.navigation.goBack();
    this.props.navigation.navigate('SearchInvoiceInvoice', {
              invoicevalue: this.state.invoice_no, compkeyn: this.state.company_name, invkey: this.state.key
            });
    this.setState({
        invoice_no: '',
     });
    })
    .catch((error) => {
      Alert.alert("Error  Adding Invoice");
      console.error("Error Adding Invoice: ", error);
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
           <Text style={{
                                 paddingTop: 7,
                                paddingBottom: 7,
                                 fontSize: 13
                             }}>Invoice Loading</Text>
        </View>
      )
    }

    return (
    
      <Container>
      
        <Content style={{
                               paddingLeft: 7,
                               paddingRight: 7,
                               paddingTop: 10,
                               paddingBottom: 0
                           }}
                keyboardShouldPersistTaps={'handled'} style= {{ flex: 1}}>          
          
           <View style={{
                               paddingLeft: 15,
                               paddingRight: 15,
                               paddingTop: 0,
                               paddingBottom: 0
                           }}>

          <Button rounded block transparent>
           <Label style={{color: 'black', fontWeight: 'bold', fontSize: 14}}>{this.state.company_name}</Label>
          </Button>

          <Button rounded block bordered dark onPress={() => {
                  this.props.navigation.navigate('SearchInvoice', {
                    invkey: this.state.key, compkeyn: this.state.company_name
                  });
                }}>
           <Label style={{color: 'grey', fontSize: 15}}>Select From Existing Invoices</Label>
          </Button>

          <Button rounded block transparent>
           <Label style={{color: 'black', fontSize: 13}}>Or Add New Invoice No</Label>
          </Button>

            <Form style={{
                               paddingTop: 0,
                               paddingBottom: 10
                           }}>
             <Item rounded style={{
                                borderColor: '#000'
                           }}>
              <Input 
                placeholder="Enter Invoice No Here"
                value={this.state.invoice_no}
                onChangeText={(text) => this.stringtInput(text, 'invoice_no')}
                autoFocus={true}
                multiline={true} 
                numberOfLines={2}
                maxLength={64}
                style={{
                                 paddingLeft: 15,
                                 paddingRight: 15,
                                 paddingTop: 0,
                                 paddingBottom: 0,
                                 fontSize: 15,
                                 textAlign:'center',
                                 fontWeight: 'bold'
                             }}/>

            </Item> 
          </Form>
          <View style={{
                               paddingLeft: 35,
                               paddingRight: 35,
                               paddingTop: 0,
                               paddingBottom: 0
                           }}>
         <Button rounded block success onPress={() => this.saveInvoice()}>
           <Label style={{color: 'white', fontSize: 17}}>Add New</Label>
          </Button>
        </View>
          
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
