import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';

import SplitScreen from './screens/SplitScreen'
import Header from './components/Header'
import Chat from './screens/Chat'

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'helvetica-neue': require('./assets/fonts/helveticaneue.ttf'),
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header/>
        <Chat/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    fontFamily: 'helvetica-neue'
  },
});
