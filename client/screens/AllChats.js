import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import { FlatList } from 'react-native-gesture-handler';

import Contact from '../components/Contact'

export default class Chat extends React.Component {
  constructor() {
    super();
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

  renderItem = ({ item }) => (
    <Contact name={item.firstName + " " + (item.lastName? item.lastName : "")} lastMsg={"Hello"} chatTime={"21:56"} />
  );

  render() {
    return (
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
