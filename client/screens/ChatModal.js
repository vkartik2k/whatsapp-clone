import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Image, TouchableNativeFeedback, Modal } from 'react-native';

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
        visible={this.props.display}
        animationType = 'slide'
        onRequestClose={this.display}
      >
        <ImageBackground source={require('../assets/background.png')} style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableNativeFeedback
                onPress={() => this.props.closeDisplay()}
                background={TouchableNativeFeedback.Ripple('#FFFFFF', true)}>
                <View style={styles.backContainer}>
                  <Image style={styles.backImg} source={require('../assets/back.png')} />
                  <Image style={styles.dpImg} source={require('../assets/defaultDp.png')} />
                </View>
              </TouchableNativeFeedback>
              <Text style={styles.name}>Mandeep</Text>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#FFFFFF', true)}>
                <View style={styles.btnImgContainer}>
                  <Image source={require('../assets/dotMenu.png')} style={styles.btnImg} />
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={styles.msgArea}>
              <SendMsg msg={"Hello"} timeStamp={"21:56"} />
              <SendMsg msg={"How are you?"} timeStamp={"21:56"} />
              <SendMsg msg={"what are you doing? Lorem Ipsum lorem lipsum chipsum chipsum hing hing tipsum lal lal lal lal"} timeStamp={"21:56"} />
              <RecMsg msg={"asdag"} timeStamp={"21:56"} />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputContainer2}>
                <Image style={styles.emojiIcon} source={require('../assets/emoji.png')} />
                <TextInput style={styles.input} placeholder="Type a message" />
                <Image style={styles.camIcon} source={require('../assets/camera.png')} />
              </View>

              <View >
                <TouchableNativeFeedback>
                  <View style={styles.mikeContainer}>
                    <Image style={styles.mikeInp} source={require('../assets/mike.png')} />
                  </View>
                </TouchableNativeFeedback>
              </View>
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
    height: 55,
    alignSelf: 'stretch',
    flexDirection: 'row',
    padding: 10
  },
  name: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '400',
    flex: 1,
    paddingHorizontal: 10

  },
  msgArea: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5
  },
  inputContainer: {
    height: 60,
    flexDirection: 'row',
  },
  input: {
    fontSize: 18,
    paddingHorizontal: 15,
    flex: 1,
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
  backImg: {
    height: 17,
    width: 17,
  },
  dpImg: {
    height: 35,
    width: 35,
    borderRadius: 18,
  },
  backContainer: {
    borderRadius: 20,
    flexDirection: 'row',
    width: 68,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  btnImg: {
    width: 25,
    height: 25,
    margin: 10,
  },
  btnImgContainer: {
    borderRadius: 50
  },
  mikeInp: {
    height: 50,
    width: 50,
  },
  mikeContainer: {
    padding: 5,
    paddingLeft: 0,
  },
  inputContainer2: {
    padding: 5,
    flex: 1,
    borderRadius: 30,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  camIcon: {
    height: 22,
    width: 22
  },
  emojiIcon: {
    height: 22,
    width: 22
  }
});
