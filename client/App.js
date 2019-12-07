import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';

import Header from './components/Header'
import Chat from './screens/Chat'
import Signup from './screens/Signup'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      User: null,
    };
  }

  _storeData = async (phone) => {
    try {
      await AsyncStorage.setItem('User', phone);
    } catch (error) {
      console.error(error)
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('User');
      if (value !== '') {
        this.setState({ User: value });
        console.log(value);
      }
    } catch (error) {
      console.error(error)
    }
  };

  componentDidMount() {
    this._retrieveData();
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.User !== null ? <View><Header /><Chat /></View> : <Signup />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 28,
  },
});
