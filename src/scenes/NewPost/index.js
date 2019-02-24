import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import { pickImage } from '../../components/PickImage'

export default class index extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}

    this.askImagePick = this.askImagePick.bind(this)
  }
  
  static navigationOptions = ({navigation}) => ({
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

  askImagePick() {
    pickImage((source) => {
      this.setState({
        ...this.state,
        avatarSource: source
      })
    })
  }
  upload() {
    
  }
  render() {
    console.log(this.state);
    
    return (
      <View>
        <Text onPress={this.askImagePick}> textInComponent </Text>
        {this.state.avatarSource && 
        <View>
          <Image source={{uri: this.state.avatarSource.uri}} style={{width: "100%", height: 200}} />
          <TouchableOpacity
          
          >
            <Text>Upload</Text>
          </TouchableOpacity>
        </View>
        }
      </View>
    )
  }
}
