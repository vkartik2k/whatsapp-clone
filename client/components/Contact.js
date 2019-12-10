import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Image, Dimensions } from 'react-native';

import ChatModal from '../screens/ChatModal'

var width = Dimensions.get('window').width;

export default class Contact extends React.Component {
  state = {
    display: false,
  };

  _onPressButton = () => {
    this.setState({ display: true });
  }
  render() {
    return (
      <TouchableNativeFeedback
        onPress={this._onPressButton}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.container}>
          <ChatModal
            socket={this.props.socket}
            name={this.props.name}
            display={this.state.display}
            closeDisplay={() => this.setState({ display: false })}
          />
          <Image style={styles.displayPicture} source={require('../assets/defaultDp.png')} />
          <View style={styles.textContainer}>
            <View style={styles.subTextContainer}>
              <Text style={styles.name}>{this.props.name}</Text>
              <Text style={styles.chatTime}>{this.props.chatTime}</Text>
            </View>
            <Text style={styles.lastmsg}>{this.props.lastMsg}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 75,
    width: width,
    paddingRight: 10,
  },
  displayPicture: {
    height: 55,
    width: 55,
    borderRadius: 25,
    margin: 10
  },
  textContainer: {
    borderBottomColor: '#DAE0E2',
    borderBottomWidth: 0.5,
    height: 75,
    width: width - 90,
    padding: 10,
    justifyContent: 'center',
  },
  subTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '500',
    fontSize: 18,
  },
  lastmsg: {
    fontSize: 16,
    color: '#7B8788',
  },
  chatTime: {
    color: '#7B8788',
    fontSize: 12,
  }
});
