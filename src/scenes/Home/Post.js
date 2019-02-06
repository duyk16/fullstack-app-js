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
  
  render() {
    return (
      <View style={{backgroundColor: '#fff', marginBottom: 10}}>
        <View style={Styles.HorizontalView} >
          <View style={styles.userAvartar} >
            <View style={styles.avatarWrap} >
              <Image 
                style={styles.avatarImage}
                source={{uri: 'http://localhost:3000/uploads/avatar/5c571a02ae684c55683d5347-1549455728807.jpg'}}
              />
            </View>
          </View>
          <View style={styles.userInfo} >
            <View>
              <Text style={styles.userNameText} >Duy Nguyen</Text>
            </View>
            <View>
              <Text style={styles.userInfoText} >admin4@gmail.com</Text>
            </View>
          </View>
          <View style={styles.postInfo} >
            <Text style={Styles.TextNormal} >3 minutes ago</Text>
          </View>
        </View>

        <View>
          <Image
            style={styles.postImage}
            source={{uri: 'http://localhost:3000/uploads/post/5c5afc87b3376247f16ed6ea-1549466759948.jpeg'}}
          />
        </View>

        <View style={[Styles.HorizontalView, styles.postBox]} >
          <View style={styles.postLeft} >
            <Text style={[Styles.TextLarge, styles.textTitle]} >
              {this.state.post.title}
            </Text>
            <Text style={[Styles.TextNormal, styles.textContent]} >
              {this.state.post.content}
            </Text>
          </View>
          <View style={styles.postRight} >
            <TouchableOpacity
              activeOpacity={0.7}
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
  userAvartar: {
    flex: 18,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrap: {
    shadowColor: Styles.Color.gray2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#eee',
    borderWidth: 1,
  },
  userInfo: {
    flex: 55,
    height: 70,
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  userNameText: {
    ...Styles.TextLarge,
    color: Styles.Color.blue
  },
  userInfoText: {
    ...Styles.TextSmall,
    color: Styles.Color.orange
  },
  postInfo: {
    flex: 27,
    height: 70,
    justifyContent: 'center',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postBox: {
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  postLeft: {
    flex: 90
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