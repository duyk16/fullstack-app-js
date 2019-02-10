import React, { Component } from 'react'
import { Text, View, Modal, ActivityIndicator, StyleSheet, Alert } from 'react-native'

export default class Loader extends Component {
  constructor(props, context) {
    super(props, context)
  }
  
  render() {
    console.log(this.props);
    return (
      <Modal
        visible={this.props.isLoading}
        transparent={true}
        animationType='none'
        onRequestClose={() => {Alert.alert('Modal has been closed.');}}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={this.props.isLoading} />
          </View>
        </View>
      </Modal>
    )
  }
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 70,
    width: 70,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
