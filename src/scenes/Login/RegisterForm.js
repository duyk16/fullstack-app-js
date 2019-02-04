import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import * as Styles from '../../config/Styles'

export default class RegisterForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formControl}>
          <TextInput 
            style={styles.inputControl}
            placeholder='Email'
            placeholderTextColor='#607688'
          />
        </View>
        <View style={styles.formControl}>
          <TextInput 
            style={styles.inputControl}
            placeholder='Password'
            placeholderTextColor='#607688'
          />
        </View>
        <View style={styles.formControl}>
          <TextInput 
            style={styles.inputControl}
            placeholder='First name'
            placeholderTextColor='#607688'
          />
        </View>
        <View style={styles.formControl}>
          <TextInput 
            style={styles.inputControl}
            placeholder='Last name'
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
              Sign up
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
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