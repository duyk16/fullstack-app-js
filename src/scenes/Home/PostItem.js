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
      post: {
        title: '10 Things You Need To Know About Animal.',
        content: 'It is used every day in all types of businesses...'
      }
    }
  }
  static navigationOptions = {
    
  }

  render() {
    return (
      <View style={{backgroundColor: '#fff', marginBottom: 10}}>
        <View style={Styles.HorizontalView} >
          <View style={Styles.userAvartar} >
            <View style={Styles.avatarWrap} >
              <Image 
                style={Styles.avatarImage}
                source={{uri: 'http://localhost:3000/uploads/avatar/5c571a02ae684c55683d5347-1549455728807.jpg'}}
              />
            </View>
          </View>
          <View style={Styles.userInfo} >
            <View>
              <Text style={Styles.userNameText} >Duy Nguyen</Text>
            </View>
            <View>
              <Text style={Styles.userInfoText} >admin4@gmail.com</Text>
            </View>
          </View>
          <View style={Styles.postInfo} >
            <Text style={Styles.TextNormal} >3 minutes ago</Text>
          </View>
        </View>

        <View>
          <Image
            style={Styles.postImage}
            source={{uri: 'http://localhost:3000/uploads/post/5c5afc87b3376247f16ed6ea-1549466759948.jpeg'}}
          />
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