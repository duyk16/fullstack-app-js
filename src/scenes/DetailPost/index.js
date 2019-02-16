import React, { Component } from 'react'
import { 
  Text, View, Image, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import * as Styles from '../../config/Styles'

export default class index extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('data').title,
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
    const data = this.props.navigation.getParam('data')
    const owner = data.owner
    
    return (
      <View style={{paddingHorizontal: 10}}>
        <ScrollView style={{height: '100%'}}>
          <View style={Styles.HorizontalView} >
            <View style={Styles.userAvartar} >
              <View style={Styles.avatarWrap} >
                <Image 
                  style={Styles.avatarImage}
                  source={{uri: 'http://' + owner.userAvatar}}
                />
              </View>
            </View>
            <View style={Styles.userInfo} >
              <View>
                <Text style={Styles.userNameText} >{owner.userName}</Text>
              </View>
              <View>
                <Text style={Styles.userInfoText} >{owner.userEmail}</Text>
              </View>
            </View>
          </View>
          
          <View style={{marginVertical: 10}} >
            <Text style={[Styles.TextDisplay1, styles.titleText]} >
              {data.title}
            </Text>
            <Text style={[Styles.TextSmall, styles.postInfoText]} >{() => this.convertTime(data.updatedAt)}</Text>
          </View>

          <View>
            <Image
              style={Styles.postImage}
              source={{uri: 'http://' + data.image}}
            />
          </View>

          <View style={{marginVertical: 10}} >
            <Text style={[Styles.TextLarge, styles.contentText]} >
              {data.content}
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  titleText: {
    paddingHorizontal: 5,
    fontWeight: '600',
  },
  postInfoText: {
    textAlign: 'left',
    paddingHorizontal: 10,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  contentText: {
    textAlign: 'justify'
  }
})