import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { Container, Content, Label, Text, Card, Button, List, Right, Body, Icon,  ListItem } from 'native-base';
import firebase from '../Firebase';

export default class SearchInvoiceScreenInvoice extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Company Added',
    };
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    //const companyvalue = (navigation.getParam(this.state.company_name));
    this.ref = firebase.firestore().collection("company").where("company_name", "==", (navigation.getParam('companyvalue')));
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
    Alert.alert("No Company Added");
    this.unsubscribe();
    }
    this.setState({
      companies,
      isLoading: false,
   });
    this.unsubscribe();
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
                             }}>Loading Company</Text>
        </View>
      )
    }

    return (

      <Container style={{paddingBottom: 20 }}>
        <Content style={{paddingLeft: 7, paddingRight: 7, paddingTop: 10, paddingBottom: 10}} keyboardShouldPersistTaps={'handled'} style= {{ flex: 1}}>
         <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 15, paddingBottom: 15 }}>

        <Button rounded block transparent>
           <Label style={{color: 'gray', fontSize: 15}}>Company Successfully Added</Label>
        </Button>

        <Button rounded block transparent>
           <Icon type="MaterialCommunityIcons" name="check-decagram" style={{fontSize: 60, color: 'green'}} />
        </Button>

         </View>
  
        <List>
              {
            this.state.companies.map((item, i) => (
          <ListItem key={i} icon>

           <Body>
           <Text style={{ paddingTop: 0, paddingBottom: 0, fontSize: 15}}>{item.company_name}</Text>
            </Body>

           <Right>
              <Text onPress={() => {
                  this.props.navigation.navigate('AddInvoice', {
                    compkey: `${JSON.stringify(item.key)}`,
                  });
                }}>Add Invoice</Text>   
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
