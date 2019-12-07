import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      User: '',
    };
  }

  _storeData = async (phone) => {
    try {
      await AsyncStorage.setItem('User', phone);
    } catch (error) {
      console.error(error)
    }
  }

  _onBtnClick = () => {
    if (this.state.User.length != 10) {
      Alert.alert('Invalid number', 'The number entered is invalid.')
    }
    else {
      let response = fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: this.state.User
        }),
      }).then((response) => response.json());
      if (response.status === 201) {
        this._storeData(this.state.User)
      }
      else {
        Alert.alert('Already Exist', 'The account with number is already active on other device.')
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Verify your phone number</Text>
        <Text style={styles.content}>WhatsApp will send you a SMS to verify your phone number. Enter your phone number.</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad" maxLength={10}
          onChangeText={text => this.setState({ User: text })}
        />
        <View style={{ flex: 1 }}></View>
        <View style={{ margin: 20 }}>
          <Button color='#25D366' title='NEXT' onPress={this._onBtnClick} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 15,
    paddingTop: 25,
  },
  heading: {
    color: '#128C7E',
    fontSize: 22,
  },
  content: {
    marginVertical: 35,
    textAlign: 'center',
    fontSize: 18
  },
  input: {
    borderBottomColor: '#128C7E',
    borderBottomWidth: 2,
    marginVertical: 25,
    width: 200,
    fontSize: 22,
    textAlign: 'center'
  }
});
