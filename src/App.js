import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Login from './scenes/Login';
import Routes from './Routes'

export default class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      user: {
        isLoggedIn: true
      }
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.state.user.isLoggedIn ? 
          <Routes /> : 
          <Login />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
