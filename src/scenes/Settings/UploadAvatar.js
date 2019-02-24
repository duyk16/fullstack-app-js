import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { pickImage } from '../../components/PickImage'
import LinearGradient from 'react-native-linear-gradient'

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as Styles from '../../config/Styles'


export default class UploadAvatar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isPick: false
    }

    this.getImagePick = this.getImagePick.bind(this)
    this.onSubmit     = this.onSubmit.bind(this)
    this.onCancel     = this.onCancel.bind(this)
  }
  
  static navigationOptions = ({navigation}) => ({
    title: 'Upload avatar',
    headerLeft: (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=>{navigation.goBack()}}
        style={{marginHorizontal: 5}}
      >
        <Entypo color='#fff' size={35} name='chevron-left' />
      </TouchableOpacity>
    )
  })
  
  getImagePick() {
    pickImage((source) => {
      this.setState({
        ...this.state,
        avatarUpload: source,
        isPick: true
      })
    })
  }
  onSubmit() {

  }

  onCancel() {
    this.setState({
      ...this.state,
      isPick: false
    })
  }
  render() {
    return (
      <View style={Styles.ContainerCenter}>
        {!this.state.isPick ? 
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.getImagePick}
          >
            <AntDesign color='#ccc' size={80} name='upload' />
          </TouchableOpacity> :
          <View style={{alignItems: 'center'}}>
            <Image 
              source={this.state.avatarUpload} 
              style={{width: 200, height: 200}} 
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 200}}>
              <TouchableOpacity 
                style={[Styles.submitFormControl, {width: 90}]}
                activeOpacity={0.7}
                onPress={this.onSubmit}
              >
                <LinearGradient 
                  colors={['#ccc', '#ddd']}
                  start={{ x: 0, y: 1 }} 
                  end={{ x: 1, y: 0 }}
                  style={[Styles.submitControl, {padding: 10}]}
                >
                  <Text style={Styles.textSubmit}>
                    Cancel
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[Styles.submitFormControl, {width: 90}]}
                activeOpacity={0.7}
                onPress={this.onSubmit}
              >
                <LinearGradient 
                  colors={['#dd4e4b', '#eec29e']}
                  start={{ x: 0, y: 1 }} 
                  end={{ x: 1, y: 0 }}
                  style={[Styles.submitControl, {padding: 10}]}
                >
                  <Text style={Styles.textSubmit}>
                    Update
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    )
  }
}