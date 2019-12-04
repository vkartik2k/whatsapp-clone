import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Contact from '../components/Contact'

export default function Chat() {
  return (
    <View style={styles.container}>
      <Contact/>
      <Contact/>
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
