import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Alert, View } from 'react-native';
import { Container, Content, Form, Item, Card, Input, Label, DatePicker, Text, Button, List, Icon, ListItem } from 'native-base';
import firebase from '../Firebase';

export default class AddSerialScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Update Serial',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      company: '',
      invoice: '',
      serial: '',
      date: '',
      model: '',
      isLoading: true,
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('serial').doc(navigation.getParam('serialkey'));
    ref.get().then((doc) => {
      if (doc.exists) {
        const serialedit = doc.data();
        this.setState({
          key: doc.id,
          company: serialedit.company,
          invoice: serialedit.invoice,
          serial: serialedit.serial,
          date: serialedit.date,
          model: serialedit.model,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  setDate(newDate) {
    this.setState({ date: newDate });
  }
  stringtInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateSerial() {
     if(this.state.serial == '' || this.state.date == '' || this.state.company == '' || this.state.invoice == '' || this.state.model == '')
    {
      Alert.alert("Please Enter All the Values.");
    }
    else {
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    const updateRef = firebase.firestore().collection('serial').doc(navigation.getParam('serialkey'));
    updateRef.set({
          company: this.state.company,
          invoice: this.state.invoice,
          serial: this.state.serial,
          date: this.state.date,
          model: this.state.model,
    }, { merge: true }).then((docRef) => {
      this.setState({
          company: '',
          invoice: '',
          serial: '',
          date: '',
        isLoading: false,
      });
      this.props.navigation.navigate('SearchSerial');
      //this.props.navigation.navigate('ShowSerial', {
              //serialkey: this.state.serial,
           // });
      Alert.alert("Serial Updated successfully");

    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
}
  

  render() {
    const { navigation } = this.props;
    const datekey = navigation.getParam('datekey');
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
          <Text style={{paddingTop: 7, paddingBottom: 7, fontSize: 13}}>Loading Serial</Text>
        </View>
      )
    }

    return (
     
      <Container>
      
        <Content>     
           <View style={{
                               paddingLeft: 15,
                               paddingRight: 15,
                               paddingTop: 10,
                               marginBottom: 0
                           }}>

         <Form style={{
                               paddingTop: 0,
                               paddingBottom: 10
                           }}>

            <Label style={{color: 'black', fontWeight: 'bold', fontSize: 15, textAlign:'center', marginBottom: 10, marginTop: 15}}>Update Serial Details</Label>              
             <Item rounded style={{
                                borderColor: '#00BFA5',
                                marginBottom: 10
                           }}>
              <Input 
                placeholder={'Company Name'}
                value={this.state.company}
                onChangeText={(text) => this.stringtInput(text, 'company')}
                multiline={true} 
               
                numberOfLines={2}
                maxLength={64}
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
                                borderColor: '#00BFA5',
                                marginBottom: 10
                           }}>
              <Input 
                placeholder={'Invoice No'}
                value={this.state.invoice}
                onChangeText={(text) => this.stringtInput(text, 'invoice')}
                multiline={true} 
               
                numberOfLines={2}
                maxLength={64}
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
                                borderColor: '#00BFA5',
                                marginBottom: 10
                           }}>
              <Input 
                placeholder={'Serial No'}
                value={this.state.serial}
                onChangeText={(text) => this.stringtInput(text, 'serial')}
                multiline={true} 
                autoFocus={true}
                numberOfLines={2}
                maxLength={64}
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
                                borderColor: '#00BFA5',
                                marginBottom: 10
                           }}>
              <Input 
                placeholder={'Model No'}
                value={this.state.model}
                onChangeText={(text) => this.stringtInput(text, 'model')}
                multiline={true} 
       
                numberOfLines={2}
                maxLength={64}
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


           <Card style={{
                                 borderColor: '#000',
                                 borderRadius: 30,
                                 marginTop: 0
                             }}>
            <DatePicker
            minimumDate={new Date(2009, 12, 1)}
            maximumDate={new Date(2039, 11, 31)}
            locale={"en_IN"}
            timeZoneOffsetInMinutes={+328}
            modalTransparent={false}
            animationType={"fade"}
            textStyle={{ color: 'green', fontSize: 15, textAlign:'center', fontWeight: 'bold' }}
            androidMode={"default"}        
            placeHolderText={datekey}
            placeHolderTextStyle={{ color: 'gray', fontSize: 15, textAlign:'center', fontWeight: 'bold' }}
            onDateChange={(newDate) => this.setDate(newDate, 'date')}
            value={this.state.date}
                style={{
                                 paddingLeft: 15,
                                 paddingRight: 15,
                                 paddingTop: 0,
                                 paddingBottom: 0
                             }}
            
            />
            </Card>
          </Form>
        </View>  
        <View style={{
                               paddingLeft: 35,
                               paddingRight: 35,
                               paddingTop: 0,
                               paddingBottom: 40
                           }}>
         <Button rounded block light onPress={() => this.updateSerial()}>
           <Label style={{color: 'black', fontSize: 17}}>Update</Label>
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
