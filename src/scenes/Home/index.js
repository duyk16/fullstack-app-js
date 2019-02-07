import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'

import PostItem from './PostItem'

export default class index extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      data: [
        {
          title: '10 Things You Need To Know About Animal.',
          content: 'It is used every day in all types of businesses...'
        },
        {
          title: '10 Things You Need To Know About Animal.',
          content: 'It is used every day in all types of businesses...'
        },
        {
          title: '10 Things You Need To Know About Animal.',
          content: 'It is used every day in all types of businesses...'
        },
        {
          title: '10 Things You Need To Know About Animal.',
          content: 'It is used every day in all types of businesses...'
        },
        {
          title: '10 Things You Need To Know About Animal.',
          content: 'It is used every day in all types of businesses...'
        },
        {
          title: '10 Things You Need To Know About Animal.',
          content: 'It is used every day in all types of businesses...'
        },
        {
          title: '10 Things You Need To Know About Animal.',
          content: 'It is used every day in all types of businesses...'
        },
      ]
    }

    this.getDetailPost = this.getDetailPost.bind(this)
  }
  
  static navigationOptions = {
    title: 'Trending',
    headerRight: (
      <TouchableOpacity style={{paddingHorizontal: 20}}>
        <FontAwesome name='user' size={30} color='#fff'/>
      </TouchableOpacity>
    ),
    headerLeft: (
      <TouchableOpacity style={{paddingHorizontal: 20}} >
        <AntDesign name='plus' size={30} color='#fff' />
      </TouchableOpacity>
    )
  }

  getDetailPost(key) {
    this.props.navigation.navigate('DetailPost', {
      data: this.state.data[key]
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#dedede'}} >
        <FlatList
          data={this.state.data}
          renderItem={ ({item, index}) => (
            <PostItem 
              data={item} 
              index={index} 
              getDetailPost={this.getDetailPost} 
            />
          )}
        />
      </View>
    )
  }
}
