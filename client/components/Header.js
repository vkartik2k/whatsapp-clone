import React from 'react';
import { StyleSheet, Text, View, Button, TouchableNativeFeedback, Image, Dimensions} from 'react-native';

var width = Dimensions.get('window').width;

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WhatsApp</Text>
      <View style={styles.btnContainer}>
        <View style={{ borderRadius: 5, overflow: 'hidden' }}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#FFFFFF', true)}
          >
            <View style={styles.btnImgContainer}>
              <Image source={require('../assets/search.png')} style={styles.btnImg} />
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{ borderRadius: 5, overflow: 'hidden' }}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#FFFFFF', true)}
          >
            <View style={styles.btnImgContainer}>
              <Image source={require('../assets/dotMenu.png')} style={styles.btnImg} />
            </View>
          </TouchableNativeFeedback>
        </View>
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
    height: 88,
    width: width,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 28,
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
    margin: 10,
  },
});
