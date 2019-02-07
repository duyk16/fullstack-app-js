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
          content: 'It is used every day in all types of businesses, what is your problem ...'
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
      ],
    }

    this.getDetailPost = this.getDetailPost.bind(this)
    this._getSettings = this._getSettings.bind(this)
  }
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Trending',
    headerLeft: (
      <TouchableOpacity style={{paddingHorizontal: 20}} >
        <AntDesign name='plus' size={30} color='#fff' />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity 
        style={{paddingHorizontal: 20}}
        activeOpacity={0.7}
        onPress={navigation.getParam('getSettings')}
      >
        <FontAwesome name='user' size={30} color='#fff'/>
      </TouchableOpacity>
    ),
  })

  getDetailPost(key) {
    this.props.navigation.navigate('DetailPost', {
      data: this.state.data[key]
    })
  }

  _getSettings() {
    this.props.navigation.navigate('Settings')
  }
  
  componentDidMount() {
    this.props.navigation.setParams({getSettings: this._getSettings})
  }
  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#dedede'}} >
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
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
