import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableNativeFeedback, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import { FlatList } from 'react-native-gesture-handler';

import Contact from '../components/Contact'

export default class ContactModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      contacts: []
    };
  }

  loadContacts = async () => {
    const permission = await Permissions.askAsync(
      Permissions.CONTACTS
    );
    if (permission.status !== 'granted') return;
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
    });
    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadContacts();
    
  }

  handleBackButtonClick() {
    this.props.closeDisplay();
    return true;
  }

  renderItem = ({ item }) => (
    <Contact socket={this.props.socket} name={item.phoneNumbers[0].number} lastMsg={"Hello"} chatTime={"21:56"} />
  );

  render() {
    return (
      <Modal
        visible={this.props.display}
        animationType='slide'
        onRequestClose={this.display}
      >
        <View style={styles.header}>
          <TouchableNativeFeedback
            onPress={() => this.props.closeDisplay()}
            background={TouchableNativeFeedback.Ripple('#FFFFFF', true)}>
            <View style={styles.backContainer}>
              <Image style={styles.backImg} source={require('../assets/back.png')} />
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.name}>Select contact</Text>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#FFFFFF', true)}>
            <View style={styles.btnImgContainer}>
              <Image source={require('../assets/dotMenu.png')} style={styles.btnImg} />
            </View>
          </TouchableNativeFeedback>
        </View>
        <FlatList
          data={this.state.contacts}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50
              }}
            >
              <Text style={{ color: '#bad555' }}>No Contacts Found</Text>
            </View>
          )}
        />
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
  backContainer: {
    borderRadius: 20,
    flexDirection: 'row',
    width: 40,
    justifyContent: 'center',
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
  backImg: {
    height: 17,
    width: 17,
  },
});