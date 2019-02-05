import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import * as Styles from '../../config/Styles'

export default class LoginForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formControl}>
          <TextInput 
            style={styles.inputControl}
            placeholder='Email'
            autoFocus={true}
            autoCapitalize='none'
            textContentType='emailAddress'
            keyboardType='email-address'
            placeholderTextColor='#607688'
          />
        </View>
        <View style={styles.formControl}>
          <TextInput 
            style={styles.inputControl}
            placeholder='Password'
            autoCapitalize='none'
            textContentType='password'
            secureTextEntry={true}
            placeholderTextColor='#607688'
          />
        </View>
        <TouchableOpacity 
          style={styles.submitFormControl}
          activeOpacity={0.7}
        >
          <LinearGradient 
            colors={['#dd4e4b', '#eec29e']} 
            start={{ x: 0, y: 1 }} 
            end={{ x: 1, y: 0 }}
            style={styles.submitControl}
          >
            <Text style={styles.textSubmit}>
              Sign in
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text style={Styles.TextNormal}>
            No account?
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={this.props.changeForm} >
            <Text 
              style={{...Styles.TextNormal, ...Styles.TextLink}}
            > Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formControl: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#dbdfe2',
    padding: 20,
    marginVertical: 5,
    width: '75%',
    backgroundColor: '#fff',
  },
  inputControl: {
    fontSize: 18,
    color: '#4d606f',
    fontWeight: '200',
  },
  submitFormControl: {
    marginVertical: 10,
    width: '75%',
  },
  submitControl: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textSubmit: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  }
})