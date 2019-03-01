import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { pickImage } from '../../components/PickImage'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

import * as Styles from '../../config/Styles'
import * as api from '../../config/API'
import * as userAction from '../../redux/actions/user.action'

class UploadAvatar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      uri: '',
      fileName: '',
      type: '',
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
    pickImage((uri, fileName, type) => {
      this.setState({
        ...this.state,
        uri,
        fileName,
        type,
        isPick: true
      })
    })
  }
  onSubmit() {
    const userId = this.props.userId
    const formData = new FormData()
    formData.append('image', {
      uri: this.state.uri,
      type: this.state.type,
      name: this.state.fileName,
    })
    
    const config = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.props.accessToken,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }

    api.uploadAvatar(userId, formData)
      .then(res => {
        this.props.updateAvatar(res.data.data.path)
        this.props.navigation.goBack()
      })
      .catch(err => console.log(err))

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
              source={{uri: this.state.uri}} 
              style={{width: 200, height: 200}} 
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 200}}>
              <TouchableOpacity 
                style={[Styles.submitFormControl, {width: 90}]}
                activeOpacity={0.7}
                onPress={this.onCancel}
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

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.userReducer.userData._id,
    accessToken: state.userReducer.userData.accessToken,
    isLoading: state.homeReducer.isLoading,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateAvatar: (avatar) => {
      dispatch(userAction.updateAvatar(avatar))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar)