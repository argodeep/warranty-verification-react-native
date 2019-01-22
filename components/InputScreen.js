import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Label, Button, Icon } from 'native-base';

export default class InputScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Choose Input',
    };
  };

  render() {
    const { navigation } = this.props;
    const compserialkey = navigation.getParam('compserialkey');
    const invserialkey = navigation.getParam('invserialkey');
    return (   

    <Container style={{ paddingBottom: 20 }}>
      
        <Content style={{ paddingLeft: 7, paddingRight: 7, paddingTop: 10, paddingBottom: 10}} keyboardShouldPersistTaps={'handled'} style={{ flex: 1}}>
        
        <View style={{paddingLeft: 55, paddingRight: 55, paddingTop: 20, paddingBottom: 0}}>

          <Button rounded block transparent>
            <Label style={{color: 'black', fontSize: 13}}>Add Serial Via Following Method</Label>
          </Button>

          <Button rounded block dark bordered iconLeft onPress={() => { this.props.navigation.navigate('AddSerial', {
                    compserialkey:  `${(compserialkey)}`, invserialkey: `${(invserialkey)}`
                  });
                }}>
            <Icon type="MaterialCommunityIcons" name='keyboard-settings-outline' style={{paddingRight: 10, color: 'gray'}}/>
           <Label style={{color: 'grey', fontSize: 16}}>Keyboard Typing</Label>
          </Button>
      
         <Button rounded block transparent>
           <Label style={{color: 'black', fontSize: 13}}>Or</Label>
         </Button>
         
         <Button rounded block dark iconLeft bordered onPress={() => { this.props.navigation.navigate('AddSerialBarcodeScreen', {
                    compserialkey:  `${(compserialkey)}`, invserialkey: `${(invserialkey)}`
                  });
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