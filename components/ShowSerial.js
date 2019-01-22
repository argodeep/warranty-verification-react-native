import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { Container, Item, Input, Content, Label, Text, Card, CardItem, Button, List, Right, Left, Body, Icon, ListItem, Thumbnail } from 'native-base';
import firebase from '../Firebase';

export default class ShowSerial extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Search Results',
    };
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.ref = firebase.firestore().collection("serial").where("serial", "==", (navigation.getParam('serialkey')));
    this.unsubscribe = null;
    this.state = {
      serial: '',
      company: '',
      invoice: '',
      date: '',
      model: '',
      method: '',
      isLoading: true,
      fetching: false,
      serials: []
    };
    }

    componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }
    componentWillUnmount() {
    this.unsubscribe();
    }

  onCollectionUpdate = (querySnapshot) => {
    const serials = [];
    querySnapshot.forEach((doc) => {
      const { serial, date, invoice, company, method, model } = doc.data();
      serials.push({
        key: doc.id,
        doc, // DocumentSnapshot
        serial,
        date,
        invoice,
        company,
        model,
        method,
      });
    });
    if (querySnapshot.size == 0) {
    this.unsubscribe();
    Alert.alert("No Serial Found");
    this.props.navigation.navigate('SearchSerial');
    }
    console.log("Search Keyword", querySnapshot.size);
    this.setState({
      serials,
      isLoading: false,
    });  
     this.unsubscribe();
  }

  dialog(key) {
    Alert.alert('Want To Delete This Serial?', 'It cannot be recovered. If deleted.',
      [
        {text: 'Yes', onPress: () => this.deleteSerial(key)},
        {text: 'Do Not Delete', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      { cancelable: false });
  }

  deleteSerial(key) {
    this.unsubscribe();
    this.setState({
      isLoading: true
    });
    firebase.firestore().collection('serial').doc(key).delete().then(() => {
      this.props.navigation.navigate('SearchSerial');
      this.unsubscribe();
      Alert.alert("A Serial Has Been Deleted");
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
                             }}>Loading Serial Nos</Text>
        </View>
      )
    }
   
    return (

      <Container>
        <Content keyboardShouldPersistTaps={'handled'} style= {{ flex: 1}}>
       
           {
            this.state.serials.map((item, i) => (

        <Card style={{marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 10}} key={i}>
          <CardItem>
              <Left>
                 <Button rounded block primary bordered style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10, paddingTop: 10}}>
                  <Label style={{color: 'blue', fontWeight: 'bold', fontSize: 16}}>{item.serial}</Label>
                  </Button>
                <Body>
                  <Text note>Invoice Date</Text>
                  <Text>{new Date(item.date.toDate()).toDateString()}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                 <Text note>Company Name</Text>
                 <Text>{item.company}</Text>
              </Body>
              <Body>
                 <Text note>Invoice Number</Text>
                 <Text>{item.invoice}</Text>
              </Body>

            
            </CardItem>

             <CardItem>
             
              <Body>
                 <Text note>Model No</Text>
                 <Text>{item.model}</Text>
              </Body>


              <Body>
                  <Text note>Captured By</Text>
                  <Text>{item.method}</Text>
             </Body>
            </CardItem>

            <CardItem footer bordered>
            <Right></Right>
            <Body></Body>
             <Left>
                

                  <Button rounded transparent style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10, paddingTop: 10, marginRight: 15}} onPress={() => {
                  this.props.navigation.navigate('EditSerial', {
                    serialkey: `${(item.key)}`, datekey: `${new Date(item.date.toDate()).toDateString()}`
                  });
                }}>
                  <Label style={{color: 'blue', fontWeight: 'bold', fontSize: 15}}>Edit</Label>
                  </Button>


                  <Button rounded transparent style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10, paddingTop: 10}} onPress={() => this.dialog(item.key)}>
                  <Label style={{color: 'red', fontWeight: 'bold', fontSize: 15}}>Delete</Label>
                  </Button>
               
              </Left>
            </CardItem>
          </Card>

           ))
          }
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
