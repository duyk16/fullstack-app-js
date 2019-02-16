import React, { Component } from 'react'
import { 
  Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'

import * as Styles from '../../config/Styles'
import Entypo from 'react-native-vector-icons/Entypo'
import * as userActions from '../../redux/actions/user.action'

class index extends Component {
  constructor(props, context) {
    super(props, context)

    this.logOut = this.logOut.bind(this)
  }
  
  static navigationOptions = ({navigation}) => ({
    title: 'You',
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

  logOut = async () => {
    this.props.request()
    await AsyncStorage.removeItem('USER')
      .then(res => {
        this.props.logOut()
        this.props.request()
      })
      .catch(err => {
        console.log('Error', err);
        this.props.request()
      })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f6f6f6'}} >
        <ScrollView>
          <View style={styles.userInfo}>
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
                <Text style={Styles.userNameText} >{this.props.userData.firstName + ' ' + this.props.userData.lastName}</Text>
              </View>
              <View style={{marginVertical: 5}}>
                <Text 
                  style={Styles.userInfoText}
                  onPress={() => alert('User profile')}
                >
                  View profile
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.groupItem}>
            <View style={styles.item}>
              <Text style={[Styles.TextNormal, {color: Styles.Color.orange}]}>
                Become a member
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={[Styles.TextNormal, {color: Styles.Color.gray2}]}>
                Help
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={[Styles.TextNormal, {color: Styles.Color.gray2}]}>
                Terms of service
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={[Styles.TextNormal, {color: Styles.Color.gray2}]}>
                Privacy policy
              </Text>
            </View>
          </View>

          <View style={styles.groupItem}>
            <View style={styles.item}>
              <Text style={[Styles.TextNormal, {color: Styles.Color.gray2}]}>
                Settings
              </Text>
            </View>
            <View style={styles.item}>
              <Text 
                style={[Styles.TextNormal, {color: Styles.Color.gray2}]}
                onPress={this.logOut}
              >
                Sign out
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginBottom: 15,
  },
  groupItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  item: {
    backgroundColor: '#fff',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    paddingVertical: 15,
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    isLoading: state.userReducer.isLoading,
    userData: state.userReducer.userData
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    request: () => {
      dispatch(userActions.request())
    },
    logOut: () => {
      dispatch(userActions.logOut())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(index)