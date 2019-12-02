import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WhatsApp</Text>
      <Button title='H'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#075E54',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    alignSelf: 'stretch',
    paddingTop: 28,
  },
  title: {
    color : '#ffffff',
    fontSize: 20,
    fontWeight: '400',
  }
});
