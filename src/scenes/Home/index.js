import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'

import * as api from '../../config/API'
import * as action from '../../redux/actions/home.action'

import PostItem from './PostItem'
import Loader from '../../components/Loader'

class index extends Component {
  constructor(props, context) {
    super(props, context)

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
  componentDidMount = () => {
    this.loadData()
  }

  loadData = async () => {
    this.props.request()
    try {
      let result = await api.getPost()
      let data = result.data.data
      this.props.getDataSuccess(data)
    } catch (error) {
      console.log(error);
      this.props.getDataFailure()
    }
    this.props.request()
  }
  
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
    data: state.homeReducer.data
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)