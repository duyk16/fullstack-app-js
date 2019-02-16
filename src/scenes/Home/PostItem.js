import React, { Component } from 'react'
import {
  Text, View, StyleSheet, Image, TouchableOpacity
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import * as Styles from '../../config/Styles'

export default class Post extends Component {
  constructor(props, context) {
    super(props, context)
    
    this.state = {
      userAvartarDefault: false,
      imageDefault: false
    }

    this.convertTime = this.convertTime.bind(this)
  }
  
  static navigationOptions = {
    
  }
  
  convertTime(time) {
    var seconds = Math.floor((new Date() - new Date(time)) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  render() {
    let { userName, userEmail } = this.props.data.owner
    let createdAt = this.convertTime(this.props.data.createdAt)
    
    const defaultAvatar = <Image style={Styles.avatarImage} source={require('../../res/images/logo_color.png')} />
    const defaultImage = <Image style={Styles.postImage} source={require('../../res/images/logo_color.png')} />
    return (
      <View style={{backgroundColor: '#fff', marginBottom: 10}}>
        <View style={Styles.HorizontalView} >
          <View style={Styles.userAvartar} >
            <View style={Styles.avatarWrap} >
            {!this.state.userAvartarDefault ?
              <Image 
                style={Styles.avatarImage}
                source={{uri: `http://${this.props.data.owner.userAvatar}`}}
                onError={() => {this.setState({...this.state, userAvartarDefault: true})}}
              /> :
              defaultAvatar
            }
            </View>
          </View>
          <View style={Styles.userInfo} >
            <View>
              <Text style={Styles.userNameText} >{userName}</Text>
            </View>
            <View>
              <Text style={Styles.userInfoText} >{userEmail}</Text>
            </View>
          </View>
          <View style={Styles.postInfo} >
            <Text style={[Styles.TextNormal, {textAlign: 'right', paddingHorizontal: 10}]} >{createdAt}</Text>
          </View>
        </View>

        <View>
          {!this.state.imageDefault ?
            <Image
              style={Styles.postImage}
              source={{uri: `http://${this.props.data.image}`}}
              onError={() => {this.setState({...this.state, imageDefault: true})}}
            /> :
            defaultImage
          }
        </View>

        <View style={[Styles.HorizontalView, styles.postBox]} >
          <View style={styles.postLeft} >
            <Text 
              numberOfLines={2}
              style={[Styles.TextLarge, styles.textTitle]} 
            >
              {this.props.data.title}
            </Text>
            <Text 
              numberOfLines={2}
              style={[Styles.TextNormal, styles.textContent]}
            >
              {this.props.data.content}
            </Text>
          </View>
          <View style={styles.postRight} >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.getDetailPost(this.props.index)}
            >
              <FontAwesome 
                name="chevron-right"
                color="#dedede"
                size={28}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  postBox: {
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  postLeft: {
    flex: 90,
    paddingHorizontal: 5,
  },
  postRight: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    paddingHorizontal: 5,
    paddingTop: 5,
    color: Styles.Color.gray2,
    fontWeight: '500',
  },
  textContent: {
    padding: 5,
    textAlign: 'justify'
  }
})