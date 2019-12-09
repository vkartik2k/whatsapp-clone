import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';
import io from 'socket.io-client';

import Header from './components/Header'
import Chat from './screens/Chat'
import Signup from './screens/Signup'

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      User: null,
    };
  }

  _createDb = () => {
    // db.transaction(tx => {
    //   tx.executeSql(
    //     "DROP TABLE recent;"
    //   );
    // }, function (err) {
    //   console.error(err);
    // }, function () {
    //   console.log("Dropped!")
    // });
    // db.transaction(tx => {
    //   tx.executeSql(
    //     "DROP TABLE message;"
    //   );
    // }, function (err) {
    //   console.error(err);
    // }, function () {
    //   console.log("Dropped!")
    // });

    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS recent (sendFrom text primary key not null, lastMsg text, chatTime text, unreadCount integer);"
      );
    }, function (err) {
      console.error(err);
    }, function () {
      console.log("Create recent Successful!")
    });
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS message (mid integer primary key not null, content text, sendTo text, sendFrom text, deliveredOn text, receivedOn text, readOn text);`
      );
    }, function (err) {
      console.error(err);
    }, function () {
      console.log("Create message Successful!")
    });
  }

  _storeData = async (phone) => {
    try {
      await AsyncStorage.setItem('User', phone);
    } catch (error) {
      console.error(error)
    }
    this.setState({ User: phone });
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('User');
      if (value !== '' && value != null) {
        this.setState({ User: value });
        this.socket.emit('connected', {
          phone: this.state.User
        })
        console.log("Emitted Connect With Device Number :"+this.state.User)
      }
    } catch (error) {
      console.error(error)
    }
  };

  componentDidMount() {
    // Create DB
    this._createDb();

    this.socket = io('http://192.168.43.161:3000', {
      transports: ['websocket']
    });

    this.socket.on('recieve_msg', function (message) {
      db.transaction(
        tx => {
          // tx.executeSql("INSERT INTO message VALUES (?, ?, ?, ?, ?, ?, ?)", 
          // [message.mid, message.content, message.to, message.from, message.deliveredOn, message.receivedOn, message.readOn]);
          // tx.executeSql("SELECT * FROM  message", [], (_, { rows }) =>
          //   console.log(rows)
          // );
          if(message.from!== this.state.User){
            tx.executeSql(`INSERT OR REPLACE INTO recent VALUES(?, ?, ?, ? )`, 
            [message.from, message.content, message.receivedOn , 0]);
            tx.executeSql(`UPDATE recent SET unreadCount = unreadCount + 1 WHERE sendFrom=?`, 
            [message.from]);
            tx.executeSql("SELECT * FROM  recent", [], (_, { rows }) =>
              console.log(rows)
            );
          }
        },
        function (err) {
          console.error(err)
        }
      );
    })
    // AsyncStorage.setItem('User', '');
    this._retrieveData();
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.User !== null ? <View><Header /><Chat /></View> : <Signup _storeData={this._storeData} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 28,
  },
});
