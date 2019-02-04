import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Login from './scenes/Login';

export default class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      user: {
        isLoggedIn: false
      }
    }
  }
  
  render() {
    if (!this.state.user.isLoggedIn) {
      return (
        <View style={styles.container}>
          <Login />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native Home!</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});
