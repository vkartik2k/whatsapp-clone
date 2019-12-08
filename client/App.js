import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';
import io from 'socket.io-client';

// import Header from './components/Header'
// import Chat from './screens/Chat'
// import Signup from './screens/Signup'

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     User: '9999999999',
  //   };
  // }

  // _storeData = async (phone) => {
  //   try {
  //     await AsyncStorage.setItem('User', phone);
  //   } catch (error) {
  //     console.error(error)
  //   }
  //   this.setState({User: phone}); 
  // };

  // _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('User');
  //     if (value !== '' && value != null) {
  //       this.setState({ User: value });
  //       // this.socket.emit('connected',{
  //       //   phone: this.state.User
  //       // })
  //       // console.log("Emitted!")
  //       // console.log(this.state.User)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // };

  componentDidMount() {
    // AsyncStorage.setItem('User', '');
    // this._retrieveData();
    this.socket = io('http://192.168.43.161:3000');
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {
          this.state.User !== null ? <View><Header /><Chat /></View> : <Signup _storeData={this._storeData} />
        } */}
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
