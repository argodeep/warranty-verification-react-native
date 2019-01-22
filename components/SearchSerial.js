import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Container, Content, Header, Item, Input, Label, Button, Icon } from 'native-base';

export default class SearchSerial extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Search Serial',
    };
  };


  constructor() {
    super();
    this.state = {
      query: ''
    };
    }

   handleQuery = (text) => {
    this.setState({ query: text })
    console.log("Type!", text);
  }

  searchSrl() {
    if(this.state.query == '')
    {
      Alert.alert("Please Enter Any Serial No");
    }
    else {
    this.props.navigation.navigate('ShowSerial', {
              serialkey: this.state.query,
            });
    }
  }

  render() {
    return (   

    <Container style={{ paddingBottom: 20 }}>
      
        <Content style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 10, paddingBottom: 10}} keyboardShouldPersistTaps={'handled'} style={{ flex: 1}}>
        
         <Header searchBar style={{backgroundColor: '#fff'}}>
          <Item>
             <Icon name="ios-search" style={{color: 'gray'}} />
             <Input
                placeholder="Type Serial No"
                value={this.state.query}
                onChangeText = {this.handleQuery}
                autoFocus={true}
                maxLength={64}/>

                <Button rounded transparent onPress={() => this.searchSrl()}>
           <Label style={{color: 'blue', fontSize: 16}}>Search</Label>
          </Button>
          </Item>
        </Header>

        <View style={{paddingLeft: 55, paddingRight: 55, paddingTop: 0, paddingBottom: 0}}>

      
         <Button rounded block transparent>
           <Label style={{color: 'black', fontSize: 13}}>Search by Barcode</Label>
         </Button>
         
         <Button rounded block dark iconLeft bordered onPress={() => { this.props.navigation.navigate('SerialSearchBarcode');
                }}>
            <Icon type="MaterialCommunityIcons" name='barcode-scan'style={{paddingRight: 15, color: 'gray'}}/>
           <Label style={{color: 'grey', fontSize: 16}}>Scan Barcode</Label>
         </Button>

        </View>
      </Content>

    </Container>
    
    );
  }
}
