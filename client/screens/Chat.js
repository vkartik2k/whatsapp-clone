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

  _loadCurrentChats = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM recent ORDER BY chatTime DESC;`,
        [],
        (_, { rows: { _array } }) => {
          this.setState({ contacts: _array })
          console.log("Chat.js :: ")
          console.log(_array)
        }
      );
    }, function (err) {
      console.error(err)
    }, function () {
      console.log("Chats.js :: All chats are fetched from db");
      this.setState({ isLoading: false });
    });
    
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this._loadCurrentChats();
  }

  renderItem = ({ item }) => (
    <Contact socket={this.props.socket} name={item.sendFrom} lastMsg={item.lastMsg} chatTime={item.chatTime} />
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
            <Text style={{ color: '#7B8788' }}>All your recent chats will appear here.</Text>
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