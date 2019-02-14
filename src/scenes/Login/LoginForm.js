import React, { Component } from 'react'
import { 
  Text, View, TextInput, TouchableOpacity, AsyncStorage, Alert
} from 'react-native'
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

import * as Styles from '../../config/Styles'
import api from '../../config/API'
import * as userAction from '../../redux/actions/user.action'

class LoginForm extends Component {
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
    this.props.request()
    if (!this.validateFields()) return
    const { email, password } = this.state.user
    api.login({email, password})
      .then(res => {
        if (res.status == 201) {
          let user = {
            userId: res.data.userId,
            accessToken: res.data.accessToken
          }
          AsyncStorage.setItem('USER', JSON.stringify(user))
            .then(res => {
              // Storage success
              this.props.loginSuccess()
              this.props.request()
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
          this.props.request()
        }
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status == 400) {
            this.setState({
              ...this.state,
              error: err.response.data.error
            })
          }
        }
        this.setState({
          ...this.state,
          alert: {
            error: true
          }
        })
        
        // End loading
        this.props.request()
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
    loginSuccess: (userData) => {
      dispatch(userAction.loginSuccess(userData))
    },
    loginFailure: () => {
      dispatch(userAction.loginSuccess())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)