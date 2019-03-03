import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'

import * as api from '../../config/API'
import * as action from '../../redux/actions/home.action'
import * as userAction from '../../redux/actions/user.action'

import PostItem from './PostItem'
import Loader from '../../components/Loader'

class index extends Component {
  constructor(props, context) {
    super(props, context)

    this.getDetailPost  = this.getDetailPost.bind(this)
    this._getSettings   = this._getSettings.bind(this)
    this._getNewPost    = this._getNewPost.bind(this)
  }
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Trending',
    headerLeft: (
      <TouchableOpacity 
        style={{paddingHorizontal: 20}}
        activeOpacity={0.7}
        onPress={navigation.getParam('getNewPost')}
      >
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
  
  loadData = async () => {
    this.props.request()
    try {
      // get user data
      let userRes = await api.getUserById(this.props.userId, this.props.accessToken)
      userRes.data.data.accessToken = this.props.accessToken
      this.props.authSuccess(userRes.data.data)
      
      // get post data
      let result = await api.getPost()
      let data = result.data.data
      
      // get owner post data
      let length = data.length
      let count = 0
      for (let i = 0; i < length; i++) {
        api.getUserById(data[i].owner, this.props.accessToken)
          .then((result) => {
            let owner = {
              userId: data[i].owner,
              userAvatar: result.data.data.avatar,
              userEmail: result.data.data.email,
              userName: result.data.data.firstName + ' ' + result.data.data.lastName
            }
            data[i].owner = owner
            this.props.getDataSuccess(data)
            count++
            if (count == length) {
              this.props.request()
            }
            return
          })
          .catch(err => {
            console.log(err)
            this.props.getDataFailure()
            count++
            if (count == length) {
              this.props.request()
            }
            return
          })
      }
    } catch (error) {
      console.log(error);
      this.props.authFailure()
      this.props.getDataFailure()
    }
    
  }
  
  getDetailPost(key) {
    this.props.navigation.navigate('DetailPost', {
      data: this.props.data[key]
    })
  }
  
  _getSettings() {
    this.props.navigation.navigate('Settings')
  }
  _getNewPost() {
    this.props.navigation.navigate('CreateNewPost')
  }

  componentDidMount() {
    this.loadData()
    this.props.navigation.setParams({getSettings: this._getSettings})
    this.props.navigation.setParams({getNewPost: this._getNewPost})
  }
  
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#dedede'}} >
        {this.props.isLoading && <Loader 
            isLoading={this.props.isLoading} 
            transparent={false}
        />}

        <FlatList
          data={this.props.data}
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

const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.homeReducer.isLoading,
    isLoggedIn: state.userReducer.isLoggedIn,
    data: state.homeReducer.data,
    userId: state.userReducer.userData.userId,
    accessToken: state.userReducer.userData.accessToken
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    request: () => {
      dispatch(action.request())
    },
    getDataSuccess: (data) => {
      dispatch(action.getDataSuccess(data))
    },
    getDataFailure: () => {
      dispatch(action.getDataFailure())
    },
    authSuccess: (userData) => {
      dispatch(userAction.authSuccess(userData))
    },
    authFailure: () => {
      dispatch(userAction.authFailure())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)