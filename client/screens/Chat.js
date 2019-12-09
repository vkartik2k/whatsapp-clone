import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Contact from '../components/Contact'

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: []
    };
  }

  loadCurrentChats = () => {
    console.log(db)
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM recent ORDERBY recieveOn DESC;`,
        [],
        (_, { rows: { _array } }) => {
          this.setState({ contacts: _array})
          console.log("Joker : majak hai kya?")
        }
      );
    });
    this.setState({ isLoading: false });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadCurrentChats();
    console.log("Hello")
  }

  renderItem = ({ item }) => (
    <Contact name={item.name} lastMsg={item.lastMsg} chatTime={item.chatTime} />
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
            <Text style={{ color: '#bad555' }}>All your recent chats will appear here.</Text>
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
