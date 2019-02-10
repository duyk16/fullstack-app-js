import React, { Component } from 'react'
import { 
  Text, View, TouchableOpacity, TextInput 
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import * as Styles from '../../config/Styles'

export default class RegisterForm extends Component {
  render() {
    return (
      <View style={Styles.ContainerCenter}>
        <View style={Styles.formControl}>
          <TextInput 
            style={Styles.inputControl}
            placeholder='Email'
            autoFocus={true}
            autoCapitalize='none'
            textContentType='emailAddress'
            keyboardType='email-address'
            placeholderTextColor='#607688'
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
          />
        </View>
        <View style={Styles.formControl}>
          <TextInput 
            style={Styles.inputControl}
            placeholder='First name'
            placeholderTextColor='#607688'
          />
        </View>
        <View style={Styles.formControl}>
          <TextInput 
            style={Styles.inputControl}
            placeholder='Last name'
            placeholderTextColor='#607688'
          />
        </View>
        <TouchableOpacity 
          style={Styles.submitFormControl}
          activeOpacity={0.7}
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
          <TouchableOpacity activeOpacity={0.7} onPress={this.props.changeForm} >
            <Text style={{fontSize: 16, color: '#dd4e4b'}}> Sign in </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}