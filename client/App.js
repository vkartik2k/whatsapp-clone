import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Chat from './screens/Chat'
import Header from './components/Header'

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
