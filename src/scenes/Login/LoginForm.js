import React, { Component } from 'react'
import { 
  Text, View, TextInput, TouchableOpacity 
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import * as Styles from '../../config/Styles'

export default class LoginForm extends Component {
  render() {
    return (
      <View style={Styles.ContainerCenter}>
        <View style={Styles.formControl}>
          <TextInput 
            style={Styles.inputControl}
            placeholder='Email'
            autoFocus={true}
            textContentType='emailAddress'
            keyboardType='email-address'
            placeholderTextColor='#607688'
            onSubmitEditing={() => { this.secondTextInput.focus() }}
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
            onSubmitEditing={() => alert('Submit')}
          />
        </View>
        <TouchableOpacity 
          style={Styles.submitFormControl}
          activeOpacity={0.7}
          onPress={() => alert('Submit data')}
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