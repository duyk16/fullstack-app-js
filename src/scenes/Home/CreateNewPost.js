import React, { Component } from 'react'
import {
  Text, View, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { pickImage } from '../../components/PickImage'
import * as Styles from '../../config/Styles'
import * as api from '../../config/API'
import * as userAction from '../../redux/actions/user.action'

class CreateNewPost extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      image: {
        uri: '',
        fileName: '',
        type: '',
        isPick: false
      },
      title: '',
      content: ''
    }

    this.getImagePick     = this.getImagePick.bind(this)
    this.onTitleChange    = this.onTitleChange.bind(this)
    this.onContentChange  = this.onContentChange.bind(this)
    this.onSubmit         = this.onSubmit.bind(this)
  }
  
  static navigationOptions = ({navigation}) => ({
    title: 'Create new post',
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

      console.log({uri, fileName});
      
      this.setState({
        ...this.state,
        image: {
          uri,
          fileName,
          type,
          isPick: true
        },
      })
    })
  }

  onSubmit() {
    if (!this.state.title
      || !this.state.content
      || !this.state.image.isPick
    ) return

    const userId = this.props.userId
    const formData = new FormData()
    formData.append('image', {
      uri: this.state.image.uri,
      type: this.state.image.type,
      name: this.state.image.fileName,
    })
    formData.append('title', this.state.title)
    formData.append('content', this.state.content)

    api.createPost(userId, formData)
      .then(res => {
        alert('success')
      })
      .catch(e => {
        console.log(e);
      })
  }

  onTitleChange(text) {
    this.setState({
      ...this.state,
      title: text
    })
  }

  onContentChange(text) {
    this.setState({
      ...this.state,
      content: text
    })
  }

  render() {
    return (
      <View style={[
        Styles.ContainerCenter,
        {
          justifyContent: 'flex-start'
        }
      ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          {/* Iamge pick */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.getImagePick}
            style={{
              marginTop: 15,
            }}
          >
            {this.state.image.isPick ? 
              <Image 
                style={styles.imageUpload} 
                source={{uri: this.state.image.uri}} 
              /> :
              <Image 
                style={styles.imageUpload}
                source={require('../../res/images/upload_post_image.png')} 
              />
            }
          </TouchableOpacity>

          {/* Post titile */}
          <View 
            style={styles.titleView}
          >
            <TextInput 
              style={styles.inputTitle}
              multiline={true}
              onChangeText={this.onTitleChange}
              placeholder='Type post title'
            />
          </View>

          {/* Post content */}
          <View 
            style={styles.contentView}
          >
            <TextInput 
              style={styles.inputContent}
              multiline={true}
              onChangeText={this.onContentChange}
              placeholder='Type post content ...'

            />
          </View>

          {/* Submit */}
          <View style={{width: '100%', paddingHorizontal: 30}}>
            <TouchableOpacity 
              style={[
                Styles.submitFormControl,
                {width: '100%'}
              ]}
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
                  Post
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageUpload: {
    width: 350,
    height: 175,
    borderRadius: 10,
  },
  inputController: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  titleView: {
    padding: 15,
    paddingTop: 25,
    width: '95%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  inputTitle: {
    fontSize: 22,
    fontWeight: '600',
  },  
  contentView: {
    padding: 15,
    width: '95%',
    minHeight: 250,
  },
  inputContent: {
    fontSize: 16,
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.userReducer.userData._id,
    accessToken: state.userReducer.userData.accessToken,
    isLoading: state.homeReducer.isLoading,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    request: () => {
      dispatch(userAction.request())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPost)