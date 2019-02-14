import React, { Component } from 'react'
import { 
  Text, View, TouchableOpacity, TextInput, Alert
} from 'react-native'
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

import * as Styles from '../../config/Styles'
import api from '../../config/API'
import * as userAction from '../../redux/actions/user.action'

class RegisterForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      user: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
      },
      alert: {
        success: false,
        error: false
      },
      error: 'Some error occurred. Please try again'
    }

    this.onEmailChange            = this.onEmailChange.bind(this)
    this.onPasswordChange         = this.onPasswordChange.bind(this)
    this.onConfirmPasswordChange  = this.onConfirmPasswordChange.bind(this)
    this.onFirstNameChange        = this.onFirstNameChange.bind(this)
    this.onLastNameChange         = this.onLastNameChange.bind(this)
    this.onSubmit                 = this.onSubmit.bind(this)
    this.successClose             = this.successClose.bind(this)
    this.errorClose               = this.errorClose.bind(this)
  }
  
  onSubmit() {
    // Start loading
    this.props.request()
    if (!this.validateFields()) return

    api.createUser({
      email: this.state.user.email,
      password: this.state.user.password,
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName
    }).then(data => {
      this.setState({
        ...this.state,
        alert: {
          ...this.state.alert,
          success: true
        }
      })
      // End loading
      this.props.request()
    }).catch(err => {
      console.log('error');
      
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
          ...this.state.alert,
          error: true
        }
      })
      console.log('error');
      // End loading
      this.props.request()
    })
  }

  successClose() {
    this.setState({
      ...this.state,
      alert: {
        ...this.state.alert,
        success: false
      }
    })

    this.props.changeForm()
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
      !this.state.user.password ||
      !this.state.user.confirmPassword ||
      !this.state.user.firstName ||
      !this.state.user.lastName
    ) {
      Alert.alert('Error', 'You must input all fields')
      return false
    }

    if (this.state.user.password != this.state.user.confirmPassword) {
      Alert.alert('Error', 'Your password is not match')
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

  onConfirmPasswordChange(text) {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        confirmPassword: text
      }
    })
  }

  onFirstNameChange(text) {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        firstName: text
      }
    })
  }

  onLastNameChange(text) {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        lastName: text
      }
    })
  }

  render() {
    return (
      <View style={Styles.ContainerCenter}>

        <SCLAlert
          theme="success"
          show={this.state.alert.success}
          title="Congratulations"
          subtitle="You're just registed to Bruno!"
          onRequestClose={() => {}}
          overlayStyle={{backgroundColor: '#444'}}
        >
          <SCLAlertButton 
            theme="success" 
            onPress={this.successClose}
          >
              Login
          </SCLAlertButton>
        </SCLAlert>

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
            autoCapitalize='none'
            textContentType='emailAddress'
            keyboardType='email-address'
            placeholderTextColor='#607688'
            onChangeText={this.onEmailChange}
            onSubmitEditing={() => { this.secondTextInput.focus() }}

          />
        </View>
        <View style={Styles.formControl}>
          <TextInput 
            style={Styles.inputControl}
            placeholder='Your password'
            autoCapitalize='none'
            textContentType='password'
            secureTextEntry={true}
            placeholderTextColor='#607688'
            onChangeText={this.onPasswordChange}
            ref={(input) => { this.secondTextInput = input }}
            onSubmitEditing={() => { this.thirdTextInput.focus() }}

          />
        </View>
        <View style={Styles.formControl}>
          <TextInput 
            style={Styles.inputControl}
            placeholder='Confirm password'
            autoCapitalize='none'
            textContentType='password'
            secureTextEntry={true}
            placeholderTextColor='#607688'
            onChangeText={this.onConfirmPasswordChange}
            ref={(input) => { this.thirdTextInput = input }}
            onSubmitEditing={() => { this.fourthTextInput.focus() }}

          />
        </View>
        <View style={Styles.formControl}>
          <TextInput 
            style={Styles.inputControl}
            placeholder='First name'
            placeholderTextColor='#607688'
            onChangeText={this.onFirstNameChange}
            ref={(input) => { this.fourthTextInput = input }}
            onSubmitEditing={() => { this.fifthTextInput.focus() }}
          />
        </View>
        <View style={Styles.formControl}>
          <TextInput 
            style={Styles.inputControl}
            placeholder='Last name'
            placeholderTextColor='#607688'
            onChangeText={this.onLastNameChange}
            ref={(input) => { this.fifthTextInput = input }}
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
              Sign up
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginBottom: 30}}>
          <Text style={{fontSize: 16, color: '#607688'}}>
            Have account? 
          </Text>
          <Text 
            style={{fontSize: 16, color: '#dd4e4b'}}
            onPress={this.props.changeForm}
          > Sign in
          </Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.userReducer.isLoading
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    request: () => {
      dispatch(userAction.request())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)