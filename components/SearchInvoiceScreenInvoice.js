import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { Container, Content, Item, Label, Text, Button, List, Right, Body, Icon, ListItem } from 'native-base';
import firebase from '../Firebase';

export default class SearchInvoiceScreenInvoice extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Invoice Added',
    };
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.ref = firebase.firestore().collection("company").doc(navigation.getParam('invkey')).collection("invoice").where("invoice_no", "==", (navigation.getParam('invoicevalue')));;
    this.unsubscribe = null;
    this.state = {
      //company_name: '',
      invoice_no: '',
      isLoading: true,
      invoices: []
    };
  }
  
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const invoices = [];
    querySnapshot.forEach((doc) => {
      const { invoice_no } = doc.data();
      invoices.push({
        key: doc.id,
        doc, // DocumentSnapshot
        invoice_no,
        //company_name,
      });
    });
    if (querySnapshot.size == 0) {
    Alert.alert("No Invoice Added");
    this.unsubscribe();
    }
    this.setState({
      invoices,
      isLoading: false,
   });
    this.unsubscribe();
  }

 

  render() {
  	const { navigation } = this.props;
  	const compkeyn = navigation.getParam('compkeyn');
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
           <Text style={{
                                 paddingTop: 7,
                                paddingBottom: 7,
                                 fontSize: 13
                             }}>Loading Invoice</Text>
        </View>
      )
    }

    return (
      <Container style={{
                               paddingBottom: 20
                           }}>
      
        <Content style={{
                               paddingLeft: 7,
                               paddingRight: 7,
                               paddingTop: 10,
                               paddingBottom: 10
                           }}
                keyboardShouldPersistTaps={'handled'} style= {{ flex: 1}}>
      
        <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15, paddingBottom: 15 }}>

        <Button rounded block transparent>
           <Label style={{color: 'gray', fontSize: 15}}>Invoice Added Successfully</Label>
        </Button>

        <Button rounded block transparent>
           <Icon type="MaterialCommunityIcons" name="check-decagram" style={{fontSize: 60, color: 'green'}} />
        </Button>

         </View>
        <List>
            <ListItem itemDivider> 
             	<Text style={{
                                 paddingTop: 0,
                                paddingBottom: 0,
                                 fontSize: 12}}>{compkeyn}</Text>
            </ListItem>

             {
            this.state.invoices.map((item, i) => (
          <ListItem key={i} icon>
           <Body>
           <Text style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                 fontSize: 15}}>{item.invoice_no}</Text>
            </Body>
           <Right>
              <Text onPress={() => {
                  this.props.navigation.navigate('InputScreen', {
                     compserialkey:  `${(compkeyn)}`, invserialkey: `${(item.invoice_no)}`,
                  });
                }}>Add Serial</Text>       
            </Right>
          </ListItem>
           ))
          }
          </List>
           
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
