import React, { Component } from 'react'
import { 
  Text, View, TextInput, TouchableOpacity, AsyncStorage, Alert
} from 'react-native'
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'
import LinearGradient from 'react-native-linear-gradient'

import * as Styles from '../../config/Styles'
import api from '../../config/API'

export default class LoginForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      user: {
        email: '',
        password: ''
      },
      alert: {
        error: false
      },
      error: 'Some error occurred. Please try again'
    }

    this.errorClose       = this.errorClose.bind(this)
    this.onEmailChange    = this.onEmailChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSubmit         = this.onSubmit.bind(this)
  }

  onSubmit() {
    // Start loading
    this.props.loading()
    if (!this.validateFields()) return
    api.login({
      email: this.state.user.email,
      password: this.state.user.password
    }).then(res => {
      console.log(res);
      if (res.status == 201) {
        let user = {
          userId: res.data.userId,
          accessToken: res.data.accessToken
        }
        AsyncStorage.setItem('USER', JSON.stringify(user))
          .then(res => {
            // End loading
            this.props.loading()
          })
          .catch(err => console.log(err))
      } else {
        this.setState({
          ...this.state,
          alert: {
            ...this.state.alert,
            error: true
          },
          error: 'Try again'
        })
      // End loading
      this.props.loading()
      }
    }).catch(err => {
      if (err.response.status == 400) {
        this.setState({
          ...this.state,
          error: err.response.data.error
        })
      }
      this.setState({
        ...this.state,
        alert: {
          ...this.state.alert,
          error: true
        }
      })
      // End loading
      this.props.loading()
    })
  }

  errorClose() {
    this.setState({
      ...this.state,
      alert: {
        ...this.state.alert,
        error: false
      }
    })
  }

  validateFields() {
    if (!this.state.user.email ||
      !this.state.user.password
    ) {
      Alert.alert('Error', 'You must input all fields')
      return false
    }
    return true
  }

  onEmailChange(text) {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        email: text
      }
    })
  }
  
  onPasswordChange(text) {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        password: text
      }
    })
  }
  render() {
    return (
      <View style={Styles.ContainerCenter}>

        <SCLAlert
          theme="danger"
          show={this.state.alert.error}
          title="Opps!"
          subtitle={this.state.error}
          onRequestClose={() => {}}
          overlayStyle={{backgroundColor: '#444'}}
        >
          <SCLAlertButton 
            theme="danger" 
            onPress={this.errorClose}
          >
              Try again
          </SCLAlertButton>
        </SCLAlert>

        <View style={Styles.formControl}>
          <TextInput 
            style={Styles.inputControl}
            placeholder='Email'
            autoFocus={true}
            autoCapitalize = 'none'
            textContentType='emailAddress'
            keyboardType='email-address'
            placeholderTextColor='#607688'
            onSubmitEditing={() => { this.secondTextInput.focus() }}
            onChangeText={this.onEmailChange}
          />
        </View>
        <View style={Styles.formControl}>
          <TextInput 
            style={Styles.inputControl}
            placeholder='Password'
            autoCapitalize='none'
            textContentType='password'
            secureTextEntry={true}
            placeholderTextColor='#607688'
            ref={(input) => { this.secondTextInput = input }}
            onSubmitEditing={this.onSubmit}
            onChangeText={this.onPasswordChange}
          />
        </View>
        <TouchableOpacity 
          style={Styles.submitFormControl}
          activeOpacity={0.7}
          onPress={this.onSubmit}
        >
          <LinearGradient 
            colors={['#dd4e4b', '#eec29e']}
            start={{ x: 0, y: 1 }} 
            end={{ x: 1, y: 0 }}
            style={Styles.submitControl}
          >
            <Text style={Styles.textSubmit}>
              Sign in
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={Styles.TextNormal}>
            No account? 
          </Text>
          <Text 
            style={{...Styles.TextNormal, ...Styles.TextLink}}
            onPress={this.props.changeForm}
          > Sign up
          </Text>
        </View>
      </View>
    )
  }
}