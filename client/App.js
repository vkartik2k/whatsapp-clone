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
    console.log("DB CREATING")
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS recent (mid integer primary key not null, lastMsg text, chatTime text, unreadCount text);"
      );
    }, function (err) {
      console.error(err);
    }, function () {
      console.log("DATABASE Created Successful")
    });
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS message (mid integer primary key not null, content text, sendTo text, sendfrom text, deliveredOn text, recievedOn text, readOn text);"
      );
    }, function (err) {
      console.error(err);
    }, function () {
      console.log("DATABASE Created Successful")
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
      console.log(value)
      if (value !== '' && value != null) {
        this.setState({ User: value });
        this.socket.emit('connected', {
          phone: this.state.User
        })
        console.log("Emitted!")
        console.log(this.state.User)
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
      // message = {
      //   mid: 123,
      //   content: "hello",
      //   to: "9999999997",
      //   from : "9999999999",
      //   deliveredOn: "1575876765747",
      //   recievedOn : "1575876765747",
      //   readOn : "575876765747"
      // }
      console.log(message)

      db.transaction(
        tx => {
          // tx.executeSql("INSERT INTO message VALUES (?, ?, ?, ?, ?, ?, ?)", [message.mid, message.content, message.to, message.from, message.deliveredOn, message.recievedOn, message.readOn]);
          tx.executeSql("select * from message", [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
          );
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
