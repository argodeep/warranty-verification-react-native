import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Alert, View } from 'react-native';
import { Container, Content, Form, Item, Input, Text, Label, Button } from 'native-base';
import firebase from '../Firebase';

export default class AddCompanyScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add New Company',
    };
  };

  constructor(props) {
    super(props);
    this.ref1 = firebase.firestore().collection("company");
    this.state = {
      company_name: '',
      isLoading: false
    };
  }
 
  stringtInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  

  saveCompany() {
    if(this.state.company_name == '')
    {
      Alert.alert("Please Add Company Name");
    }
    else {

    this.setState({
      isLoading: true,
    });
    this.ref1.add({
      company_name: this.state.company_name,
    }).then((docRef) => {
      this.setState({
        company_name: this.state.company_name,
        isLoading: false,
      });
    //this.props.navigation.goBack();
    this.props.navigation.navigate('SearchCompanyInvoice', {
              companyvalue: this.state.company_name,
            });
    this.setState({
        company_name: '',
     });
    })
    .catch((error) => {
      Alert.alert("Error Adding Company");
      console.error("Error Adding Company: ", error);
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
           <Text style={{paddingTop: 7, paddingBottom: 7, fontSize: 13}}>Adding New Company</Text>
        </View>
      )
    }

    return (
    
      <Container>
      
        <Content style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 0, paddingBottom: 0 }} keyboardShouldPersistTaps={'handled'} style= {{ flex: 1}}>
        
        <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 20, paddingBottom: 0 }}>
        
        
         <Form>
            <Item rounded style={{ borderColor: '#000'}}>
             
              <Input 
                placeholder="Enter company name"
                value={this.state.company_name}
                onChangeText={(text) => this.stringtInput(text, 'company_name')}
                autoFocus={true}
                multiline={true} 
                numberOfLines={2}
                maxLength={64}
                style={{paddingLeft: 10, paddingRight: 10, paddingTop: 0, paddingBottom: 0, fontSize: 15, textAlign:'center', fontWeight: 'bold' }}/>
            </Item> 
         </Form>
        </View>

        <View style={{paddingLeft: 45, paddingRight: 45, paddingTop: 15, paddingBottom: 10 }}>
         <Button rounded block success onPress={() => this.saveCompany()}>
           <Label style={{color: 'white', fontSize: 15}}>Add Company</Label>
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
