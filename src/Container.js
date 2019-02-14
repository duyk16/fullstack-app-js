import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'

import api from './config/API'
import * as userAction from './redux/actions/user.action'

import Login from './scenes/Login';
import Routes from './Routes'
import Loader from './components/Loader'

class Container extends Component {  
  componentWillMount() {
    this.isLoggedIn()
  }
  
  isLoggedIn = async () => {
    this.props.request()
    // Read data from Local Storage
    let userData = await AsyncStorage.getItem('USER');
    userData = JSON.parse(userData)
    if (userData) {
      api.getUserById(userData.userId, userData.accessToken)
        .then(res => {
          this.props.authSuccess(res.data.data)
          this.props.request()
        })
        .catch(err => {
          this.props.authFailure()
          this.props.request()
        })
    } else {
      this.props.authFailure()
      this.props.request()
    }

  }
  
  render() {
    return (
        <View style={styles.container}>
          {this.props.isLoading && <Loader 
            isLoading={this.props.isLoading} 
            transparent={false}
          />}
          {this.props.isLoggedIn ? 
            <Routes /> : 
            <Login />}
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

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    isLoading: state.userReducer.isLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    request: () => {
      dispatch(userAction.request())
    },
    authSuccess: (userData) => {
      dispatch(userAction.authSuccess(userData))
    },
    authFailure: () => {
      dispatch(userAction.authFailure())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)