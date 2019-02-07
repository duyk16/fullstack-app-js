import React, { Component } from 'react'
import { 
  Text, View, Image, StyleSheet, ScrollView, TouchableOpacity
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import * as Styles from '../../config/Styles'

export default class index extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('data').title,
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
  render() {
    const data = this.props.navigation.getParam('data')
    return (
      <View style={{paddingHorizontal: 10}}>
        <ScrollView style={{height: '100%'}}>
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
          </View>
          
          <View style={{marginVertical: 10}} >
            <Text style={[Styles.TextDisplay1, styles.titleText]} >
              {data.title}
            </Text>
            <Text style={[Styles.TextSmall, styles.postInfoText]} >31 Jun 2019</Text>
          </View>

          <View>
            <Image
              style={Styles.postImage}
              source={{uri: 'http://localhost:3000/uploads/post/5c5afc87b3376247f16ed6ea-1549466759948.jpeg'}}
            />
          </View>

          <View style={{marginVertical: 10}} >
            <Text style={[Styles.TextLarge, styles.contentText]} >
              {data.content}
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  titleText: {
    paddingHorizontal: 5,
    fontWeight: '600',
  },
  postInfoText: {
    textAlign: 'left',
    paddingHorizontal: 10,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  contentText: {
    textAlign: 'justify'
  }
})