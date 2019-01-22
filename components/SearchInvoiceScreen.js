import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { Container, Content, Item, Label, Card, Text, Button, List, Right, Body, Icon, ListItem } from 'native-base';
import firebase from '../Firebase';

export default class SearchInvoiceScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Select Invoice',
    };
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.ref = firebase.firestore().collection("company").doc(navigation.getParam('invkey')).collection("invoice");
    this.state = {
      //company_name: '',
      invoice_no: '',
      fetching: false,
      isLoading: true,
      invoices: []
    };
  }
  
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.setState({fetching: true});
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
   this.unsubscribe();
   this.props.navigation.goBack();
    Alert.alert("No Invoice Found", '',
      [
        {text: 'Add Invoice', onPress: () => this.props.navigation.navigate("AddInvoice")},
      ],
      { cancelable: false });
    }
    this.setState({
      invoices,
      isLoading: false,
   });
    this.unsubscribe();
  }

  dialog(key) {
    Alert.alert('Want To Delete This Invoice?', 'It cannot be recovered. If deleted.',
      [
        {text: 'Yes', onPress: () => this.deleteInvoice(key)},
        {text: 'Do Not Delete', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false });
  }

  deleteInvoice(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    firebase.firestore().collection("company").doc(navigation.getParam('invkey')).collection("invoice").doc(key).delete().then(() => {
      this.props.navigation.navigate('AddInvoice');
      this.unsubscribe();
      Alert.alert("An Invoice Has Been Deleted");
      this.setState({
        isLoading: true
      });
    }).catch((error) => {
      this.unsubscribe();
      console.error("Error removing document: ", error);
      this.setState({
        isLoading: false
      });
    });
  }

  render() {
  	const { navigation } = this.props;
  	const compkeyn = navigation.getParam('compkeyn');
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
           <Text  maxLength={20} style={{
                                 paddingTop: 7,
                                paddingBottom: 7,
                                 fontSize: 13
                             }}>Loading Invoice List</Text>
        </View>
      )
    }

    return (
      <Container style={{paddingBottom: 20 }}>
      
        <Content style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 10, paddingBottom: 10
                           }}
                keyboardShouldPersistTaps={'handled'} style= {{ flex: 1}}>
       <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 5, paddingBottom: 5 }}>
         
         <Button rounded block dark bordered onPress={() => this.props.navigation.navigate("AddInvoice")}>
           <Label style={{color: 'gray', fontSize: 15}}>Add New Invoice</Label>
          </Button>
        </View>
        <Card rounded>   
        <List>
            
            <ListItem itemDivider> 
             <Text style={{
                                 paddingTop: 0,
                                paddingBottom: 0,
                                 fontSize: 12}}>Existing Invoices (ASC) - {compkeyn}</Text>
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
              <Text style={{color: 'blue', fontSize: 14, paddingRight: 7}} onPress={() => {
                  this.props.navigation.navigate('InputScreen', {
                    compserialkey:  `${(compkeyn)}`, invserialkey: `${(item.invoice_no)}`,
                  });
                }}>Add Serial</Text>
              <Text style={{color: 'red', fontSize: 14, paddingLeft: 7}} onPress={() => this.dialog(item.key)}>Delete</Text>  
            </Right>
          </ListItem>
           ))
          }
          </List>
          </Card>

          
           
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
