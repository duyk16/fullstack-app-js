import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Post from './Post'

export default class index extends Component {
  static navigationOptions = {
    title: 'Trending',
    headerRight: (
      <View style={{paddingHorizontal: 20}}>
        <FontAwesome 
          name='user' 
          size={30}
          color='#fff'
        />
      </View>
    ),
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#dedede'}} >
        <ScrollView >
          <Post />
        </ScrollView>
      </View>
    )
  }
}
