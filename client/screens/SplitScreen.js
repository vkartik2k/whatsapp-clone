import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import Chat from './Chat';
import Status from './Status';
import Header from '../components/Header';

const FirstRoute = () => (
  <Chat />
);

const SecondRoute = () => (
  <Status />
);

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Chat' },
      { key: 'second', title: 'Status' },
    ],
  };

  render() {
    return (
      <TabView
        style={styles.splitScreen}
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        renderHeader={<Header/>}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}

const styles = StyleSheet.create({
  splitScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});