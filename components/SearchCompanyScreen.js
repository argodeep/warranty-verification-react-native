import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { Container, Content, Label, Text, Button, Card, List, Right, Body, Icon, ListItem } from 'native-base';
import firebase from '../Firebase';

export default class SearchCompanyScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Select Company',
    };
  };

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("company").orderBy("company_name", "asc");
    this.unsubscribe = null;
    this.state = {
      company_name: '',
      isLoading: true,
      companies: []
    };
  }
  
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const companies = [];
    querySnapshot.forEach((doc) => {
      const { company_name } = doc.data();
      companies.push({
        key: doc.id,
        doc, // DocumentSnapshot
        company_name,
      });
    });
    if (querySnapshot.size == 0) {
    Alert.alert('No Company Found', '',
      [
        {text: 'Add Company', onPress: () => this.props.navigation.navigate("AddCompany")},
        {text: 'Later', onPress: () => console.log('Later Pressed'), style: 'cancel'},
      ],
      { cancelable: false });
    this.props.navigation.goBack();
    this.unsubscribe();
    } else {
    this.setState({
      companies,
      isLoading: false,
   });
    this.unsubscribe();
  }
  }

  dialog(key) {
    Alert.alert('Want To Delete This Company?', 'All Invoices Related To This Company Will Also Be Deleted. It cannot be recovered. If deleted.',
      [
        {text: 'Yes', onPress: () => this.deleteCompany(key)},
        {text: 'Do Not Delete', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false });
  }

  deleteCompany(key) {
    this.setState({
      isLoading: true
    });
    firebase.firestore().collection('company').doc(key).delete().then(() => {
      this.props.navigation.navigate('Main');
      this.unsubscribe();
      Alert.alert("A Company Has Been Deleted");
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
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
           <Text style={{
                                 paddingTop: 7,
                                paddingBottom: 7,
                                 fontSize: 13
                             }}>Loading Company List</Text>
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
       <View style={{
                               paddingLeft: 15,
                               paddingRight: 15,
                               paddingTop: 5,
                               paddingBottom: 5
                           }}>
         <Button rounded block bordered dark onPress={() => this.props.navigation.navigate("AddCompany")}>
           <Label style={{color: 'grey', fontSize: 15}}>Add New Company</Label>
          </Button>
        </View>      
        <Card rounded>   
        <List>
            <ListItem itemDivider>
              <Text style={{
                                 paddingTop: 0,
                                paddingBottom: 0,
                                 fontSize: 12}}>Existing Company Name (A - Z)</Text>
            </ListItem>
              {
            this.state.companies.map((item, i) => (
          <ListItem key={i} icon>
           <Body>
           <Text style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                fontWeight: 'normal',
                                fontSize: 15}}>{item.company_name}</Text>
            </Body>
           <Right>
              <Text style={{color: 'blue', fontSize: 14, paddingRight: 7}} onPress={() => {
                  this.props.navigation.navigate('AddInvoice', {
                    compkey: `${JSON.stringify(item.key)}`,
                  });
                }}>Invoices</Text>
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
