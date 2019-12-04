import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SplitScreen from './screens/SplitScreen'
import Header from './components/Header'
import Chat from './screens/Chat'

export default function App() {
  return (
    <View style={styles.container}>
      <Header/>
      <Chat/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
