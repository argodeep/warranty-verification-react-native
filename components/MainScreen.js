import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Left, Body, Thumbnail, Card, CardItem, Image, Button, Label, Icon, Right } from 'native-base';
import { Linking } from 'react-native';

export default class MainScreen extends Component {

	static navigationOptions = ({ navigation }) => {
    return {
      title: 'Warranty Verification',
    	};
  	};

	render() {
	    return (
	      <Container>
	        
        <Content style={{
                               paddingLeft: 7,
                               paddingRight: 7,
                               paddingTop: 3,
                               paddingBottom: 0
                           }}>
	         <List>
            <ListItem avatar onPress={() => this.props.navigation.navigate("SearchSerial")}>
              <Left>
                <Thumbnail source={require('../assets/1.png')} />
              </Left>
              <Body>
                <Text>Search Product Serial</Text>
                <Text note>Get product serial, invoice, date & company details</Text>
              </Body>
             
            </ListItem>
            <ListItem avatar onPress={() => this.props.navigation.navigate("SearchCompany")}>
              <Left>
                <Thumbnail source={require('../assets/3.png')} />
              </Left>
              <Body>
                <Text>Add Serial & Invoice</Text>
                <Text note>Add new product serial & invoice for any company</Text>
              </Body>
            
            </ListItem>

            <ListItem avatar onPress={() => this.props.navigation.navigate("AddCompany")}>
              <Left>
                <Thumbnail source={require('../assets/2.png')} />
              </Left>
              <Body>
                <Text>Add New Company</Text>
                <Text note>Add new company to started with warranty management</Text>
              </Body>
        
            </ListItem>
          </List>

           <Card style={{
                             marginTop: 25
                           }}>
            <CardItem header>
              <Text>App Developer Info</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://scontent.fgau1-1.fna.fbcdn.net/v/t1.0-9/38491902_1790085461076915_1608236927595577344_n.jpg?_nc_cat=109&_nc_ht=scontent.fgau1-1.fna&oh=321ee32aa76c08b610ba36cc4527adba&oe=5CA8B248'}} />
                <Body>
                  <Text>Arghyadeep Majumder</Text>
                  <Text note>React Native Developer</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Left><Icon active name="logo-github" style={{ color: 'black'}} onPress={ ()=>{ Linking.openURL('https://github.com/argodeep')}} />
              <Text onPress={ ()=>{ Linking.openURL('https://github.com/argodeep')}}>Github </Text>
             </Left>

             <Left>
              <Icon active name="logo-linkedin" style={{ color: 'deepskyblue'}} onPress={ ()=>{ Linking.openURL('https://www.linkedin.com/in/argodeep/')}} />
              <Text onPress={ ()=>{ Linking.openURL('https://www.linkedin.com/in/argodeep/')}}>Linkedin</Text>
            </Left>

             <Left>
              <Icon active name="mail" style={{ color: 'red'}} onPress={ ()=>{ Linking.openURL('mailto:arghyadeep.official@gmail.com')}}/>
              <Text onPress={ ()=>{ Linking.openURL('mailto:arghyadeep.official@gmail.com')}}>Contact</Text>
             </Left>
             </CardItem>

          </Card>
      
	        </Content>
	       
	      </Container>
	    );
  }
}