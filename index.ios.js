/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class imagePicker extends Component {

  _upload(image){
    let form = new FormData();

    let path = image.path;
    let filename = path.substr(path.lastIndexOf('/')+1);
    
    let file = {uri: path, type: 'multipart/form-data',name:filename};  
    form.append('file',file);
    
    fetch('http://127.0.0.1:3000/api/upload',{
      method:'POST',
      body:form,
      headers:{  
        'Content-Type':'multipart/form-data',  
      }
    })
    .then((response) => response.json())
    .then(json => {

    })
    .catch((error) => {

    })
  }

  _selectImage(){
    ImagePicker.openPicker({
      multiple: true
    })
    .then(images => {
      console.log(images)
      if(images.length !== 1) return console.log('请一次只选中一张图片进行上传！')
      this._upload(images[0]);
    })
    .catch((error)=>{
      console.log(error)
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <TouchableWithoutFeedback
          onPress={()=>{
            this._selectImage();
          }}
          >
          <View style={styles.button}>
            <Text>Click me</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    borderColor:'#000',
    borderWidth:1,
    borderRadius:4,
    paddingVertical:10,
    paddingHorizontal:10
  }
});

AppRegistry.registerComponent('imagePicker', () => imagePicker);
