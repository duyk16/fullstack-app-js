import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';

import Login from './scenes/Login';
import Routes from './Routes'

export default class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      user: {
        isLoggedIn: false
      }
    }
  }
  
  componentWillMount() {
    // this.isLoggedIn()
    // this.setItemStorage()
  }
  
  isLoggedIn = async () => {
    // Read data from Storage
    let userData = await AsyncStorage.getItem('USER');
    if (!userData) {
      return this.setState({
        user: {
          isLoggedIn: false
        }
      })
    }
  }
  
  setItemStorage = async () => {
    let data = {
      logginToken: 'asdasd'
    }
    await AsyncStorage.setItem('USER', JSON.stringify(data));
    console.log(data);
  }

  logOut = async () => {
    await AsyncStorage.removeItem('USER')
    return this.setState({
      user: {
        isLoggedIn: false
      }
    })
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
