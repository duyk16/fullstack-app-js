import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

import Post from './Post'

export default class index extends Component {
  static navigationOptions = {
    title: 'Trending',
    headerRight: (
      <View style={{paddingHorizontal: 20}}>
        <FontAwesome name='user' size={30} color='#fff'/>
      </View>
    ),
    headerLeft: (
      <View style={{paddingHorizontal: 20}} >
        <Feather name='search' size={30} color='#fff' />
      </View>
    )
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#dedede'}} >
        <FlatList
          data={[
            {key: 1},
            {key: 1},
            {key: 1}
          ]}
          renderItem={({item}) => (
            <Post key={item.key} />
          )}
        />
      </View>
    )
  }
}
