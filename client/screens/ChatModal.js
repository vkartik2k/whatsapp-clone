import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput, ImageBackground, Image } from 'react-native';

class ModalHeader extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <Image style={styles.backImg} source={require('../assets/back.png')}/>
        <Text style={styles.name}>{this.props.name}</Text>
      </View>
    )
  }
}

class RecMsg extends React.Component {
  render() {
    return (
      <View style={styles.RecMsgContainer}>
        <View style={styles.RecMsg}>
          <Text style={{ fontSize: 17 }}>{this.props.msg}</Text>
          <Text style={styles.timeStamp}>{this.props.timeStamp}</Text>
        </View>
      </View>
    )
  }
}

class SendMsg extends React.Component {
  render() {
    return (
      <View style={styles.SendMsgContainer}>
        <View style={styles.SendMsg}>
          <Text style={{ fontSize: 17 }}>{this.props.msg}</Text>
          <Text style={styles.timeStamp}>{this.props.timeStamp}</Text>
        </View>
      </View>
    )
  }
}

export default class ChatModal extends React.Component {
  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType="slide"
      >
        <ImageBackground source={require('../assets/background.png')} style={{ flex: 1 }}>
          <View style={styles.container}>
            <ModalHeader name={"Mandeep"} />
            <View style={styles.msgArea}>
              <SendMsg msg={"Hello"} timeStamp={"21:56"} />
              <SendMsg msg={"How are you?"} timeStamp={"21:56"} />
              <SendMsg msg={"what are you doing? Lorem Ipsum lorem lipsum chipsum chipsum hing hing tipsum lal lal lal lal"} timeStamp={"21:56"} />
              <RecMsg msg={"asdag"} timeStamp={"21:56"} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="Type your message here ..." />
            </View>
          </View>
        </ImageBackground>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#075E54',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  name: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '400',
  },
  msgArea: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5
  },
  inputContainer: {
    height: 60,
  },
  input: {
    padding: 5,
    flex: 1,
    borderRadius: 30,
    margin: 5,
    backgroundColor: 'white',
    fontSize: 18,
    paddingLeft: 15,
  },
  RecMsg: {
    padding: 5,
    maxWidth: 270,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  SendMsg: {
    padding: 5,
    maxWidth: 270,
    backgroundColor: '#DCF8C6',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  SendMsgContainer: {
    padding: 2,
    flexDirection: 'row-reverse',
  },
  RecMsgContainer: {
    padding: 2,
    flexDirection: 'row',
  },
  timeStamp: {
    fontSize: 12,
    color: "#7B8788",
    paddingLeft: 10,
  },
  backImg:{
    height:25,
    width: 25
  }
});
