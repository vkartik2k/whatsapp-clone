import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Image, Dimensions } from 'react-native';

var width = Dimensions.get('window').width;

export default function Contact() {
  return (
    <TouchableNativeFeedback
      onPress={this._onPressButton}
      background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={styles.container}>
        <Image style={styles.displayPicture} source={require('../assets/defaultDp.png')} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>Kartik</Text>
          <Text style={styles.lastmsg}>sat hi chalenge</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 75,
    width: width,
    paddingRight: 10,
  },
  displayPicture : {
    height: 55,
    width: 55,
    borderRadius: 25,
    margin: 10
  },
  textContainer : {
    borderBottomColor : '#DAE0E2',
    borderBottomWidth: 0.5,
    height: 75,
    width: width - 90,
    padding: 10,
    justifyContent: 'center',
  },
  name : {
    fontWeight: '500',
    fontSize: 18
  },
  lastmsg : {
    fontSize: 16,
    color : '#7B8788',
  }
});
