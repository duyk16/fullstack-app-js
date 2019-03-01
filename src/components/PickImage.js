import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export const pickImage = (cb) => {
  ImagePicker.showImagePicker(options, (response) => {
    // console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = {
        uri: response.uri
      };
      cb(response.uri, response.fileName, response.type)
    }
  });
}