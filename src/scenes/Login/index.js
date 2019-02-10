import React, { Component } from 'react'
import { 
  Text, View, Image, StyleSheet, KeyboardAvoidingView, ScrollView, Button
} from 'react-native'

import * as Styles from '../../config/Styles'

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm'
import Loader from '../../components/Loader'

export default class Login extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isRegister: false,
      isLoading: false,
    }

    this.changeForm = this.changeForm.bind(this)
    this._loading = this._loading.bind(this)
  }
  
  changeForm() {
    this.setState({
      isRegister: !this.state.isRegister
    })
  }

  createUser = async () => {

  }

  _loading() {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading
    })
  }

  render() {
    return (
      <View style={{...Styles.ContainerCenter, height: '100%', paddingTop: 20}} >
        <KeyboardAvoidingView 
          style={[Styles.ContainerCenter, {height: '100%'}]} 
          behavior="padding" 
          enabled
        >

        <Loader isLoading={this.state.isLoading} />

        <ScrollView style={{width: '100%', height: '100%', paddingBottom: 30}}
          centerContent={true}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        > 
          <View style={Styles.ContainerCenter}>
          <View>
            <Image 
              source={require('../../res/images/logo_color.png')}
              style={styles.logo}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={Styles.TextHeader}>
              Welcome to Buro!
            </Text>
          </View>
          {!this.state.isRegister ? 
            <LoginForm 
              changeForm={this.changeForm} 
              loading={this._loading} /> : 
            <RegisterForm 
              changeForm={this.changeForm} 
              loading={this._loading} />
          }
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
        <View style={{...styles.bottomSign}}>
          <Text style={Styles.TextSmall}>App by Duyk16</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 82,
    height: 80,
    marginVertical: 30,
  },
  bottomSign: {
    marginVertical: 10
  }
})