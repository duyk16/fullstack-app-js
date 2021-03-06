import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'

import Home from './scenes/Home'
import DetailPost from './scenes/DetailPost'
import CreateNewPost from './scenes/Home/CreateNewPost'
import Settings from './scenes/Settings'
import NewPost from './scenes/NewPost'
import UploadAvatar from './scenes/Settings/UploadAvatar'

const AppNavigator = createStackNavigator(
  {
    Home,
    CreateNewPost,
    DetailPost,
    Settings,
    NewPost,
    UploadAvatar
  },
  {
    defaultNavigationOptions: {
      headerBackground: (
        <LinearGradient 
          colors={['#e25d59', '#f3c59e']}
          start={{ x: 0, y: 1 }} 
          end={{ x: 1, y: 0 }}   
          style={{flex: 1}}
        >
          <StatusBar barStyle='light-content' />
        </LinearGradient>
      ),
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '400',
        fontSize: 20,
      },
      headerStyle: {
        height: 60
      }
    }
  }
)

export default createAppContainer(AppNavigator)
