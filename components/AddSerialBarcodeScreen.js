import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, Alert, View } from 'react-native';
import { Container, Content, Form, Label, Item, Input, DatePicker, Card, Text, Button, Icon, Fab } from 'native-base';
import firebase from '../Firebase';

export default class AddSerialBarcodeScreen extends Component {

   static navigationOptions = ({ navigation }) => {
     return {
       title: 'Add Serial',
     };
   };

   constructor(props) {
     super(props);
     this.setDate = this.setDate.bind(this);
     this.ref = firebase.firestore().collection('serial');
     this.unsubscribe = null;
     this.state = {
       company: '',
       invoice: '',
       serial: '',
       date: '',
       model: '',
       method: '',
       isLoading: false,
       serials: []
     };
   }

   setDate(newDate) {
     this.setState({ date: newDate });
   }

    stringtInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
   }

   saveSerial() {
     const { navigation } = this.props;
     const barcodevalue = navigation.getParam('barcodevalue');
     if(barcodevalue == null || this.state.date == '' || this.state.model == '')
     {
       Alert.alert("Please Enter All the Values.");
     }
     else {

     this.setState({
       isLoading: true,
     });
     
     const { navigation } = this.props;
     const compserialkey = navigation.getParam('compserialkey');
     const invserialkey = navigation.getParam('invserialkey');
     const barcodevalue = navigation.getParam('barcodevalue');
     this.ref.add({
       company: compserialkey,
       invoice: invserialkey,
       serial: barcodevalue,
       date: this.state.date,
       model: this.state.model,
       method: 'Barcode Scan',
     })
     .then((docRef) => {
       this.setState({
         company: compserialkey,
         invoice: invserialkey,
         serial: '',
         date: '',
         model: '',
         method: '',
         isLoading: true,
       });
     {
       Alert.alert("Serial successfully Added");
     }
      
    this.setState({
         isLoading: true,
    });

    this.props.navigation.navigate('InputScreen', {
               compserialkey:  `${(compserialkey)}`, invserialkey: `${(invserialkey)}`
            });
    this.props.navigation.navigate('AddSerialBarcodeScreen', {
               compserialkey:  `${(compserialkey)}`, invserialkey: `${(invserialkey)}`
            });
   //this.props.navigation.goBack();
     })
     .catch((error) => {
       Alert.alert("Error While Saving");
       console.error("Error While Saving: ", error);
       this.setState({
         isLoading: false,
       });
     });
     }
   }
   

   render() {
     const { navigation } = this.props;
     const compserialkey = navigation.getParam('compserialkey');
     const invserialkey = navigation.getParam('invserialkey');
     const barcodevalue = navigation.getParam('barcodevalue');
     if(this.state.isLoading){
       return(
         <View style={styles.activity}>
           <ActivityIndicator size="large" color="#0000ff"/>
           <Text style={{paddingTop: 7, paddingBottom: 7, fontSize: 13}}>Adding Serial</Text>
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
            <Label style={{color: 'black', fontWeight: 'bold', fontSize: 14, textAlign:'center', marginBottom: 0}}>{compserialkey}</Label>
           <Button rounded block transparent>
            <Label style={{color: 'black', fontWeight: 'normal', fontSize: 14}}>Invoice no: </Label>
            <Label style={{color: 'black', fontWeight: 'bold', fontSize: 16}}> {invserialkey}</Label>
           </Button>

          <Form style={{
                                paddingTop: 0,
                                paddingBottom: 10
                            }}>

             <Label style={{color: 'blue', fontWeight: 'normal', fontSize: 12, textAlign:'center', marginBottom: 10, marginTop: 15 }}>Scan Serial No & Date</Label>              
           <Item rounded style={{
                                borderColor: '#00BFA5'
                           }}>
              <Input 
                placeholder="Scan Barcode Below"
                autoCorrect={false}
                value={barcodevalue}
                editable={false}
                selectTextOnFocus={false}
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
                                marginTop: 10,
                                borderColor: '#00BFA5'
                           }}>
              <Input 
                placeholder="Enter Model No"
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
                                  marginTop: 10
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
             placeHolderText="Select Date"
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
                                paddingBottom: 0
                            }}>
          <Button rounded block success onPress={() => this.saveSerial()}>
            <Label style={{color: 'white', fontSize: 17}}>Add Serial</Label>
           </Button>


          <Button rounded block transparent dark onPress={() => this.props.navigation.navigate('Main')} style={{ marginTop: 10  }}>
           <Label style={{color: 'blue', fontSize: 17}}>Go Home</Label>
          </Button>
         </View>
         </Content>
         <Fab
            direction="up"
            style={{ backgroundColor: '#006064'}}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate("Barcode")}>
            <Icon type="MaterialCommunityIcons" name='barcode-scan' style={{color: 'white', fontSize: 30}}/>
            
          </Fab>
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
