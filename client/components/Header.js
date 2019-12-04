import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WhatsApp</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnImgContainer} activeOpacity={0.5}>
          <Image source={require('../assets/search.png')} style={styles.btnImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnImgContainer} activeOpacity={0.5}>
          <Image source={require('../assets/dotMenu.png')} style={styles.btnImg} />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#075E54',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90,
    alignSelf: 'stretch',
    paddingTop: 28,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '400',
  },
  btnImg: {
    width: 25,
    height: 25,
    marginLeft: 10,
  }
});
