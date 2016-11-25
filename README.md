# react-native 图片获取上传实例

- 依赖插件：[react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)

## 目录
- [初始化项目](#初始化项目)
- [引入插件](#引入插件)
- [IOS](#ios)
- [Android](#android)
- [react-native调用](#react-native调用)
- [上传](#上传)
- [issues](#issues)

### 初始化项目
- [RN官方文档](https://facebook.github.io/react-native/docs/getting-started.html#content)  

```
react-native init imagePicker
```
### 引入插件

- [参考官方文档](https://github.com/ivpusic/react-native-image-crop-picker)

```shell
npm i react-native-image-crop-picker --save # 安装插件
react-native link react-native-image-crop-picker # 关联插件
```
### IOS

ISO开发需要添加以下代码到 `info.plist`
```
<key>NSLocationWhenInUseUsageDescription</key>
<string></string>
```

### Android

添加相机调用权限(i think ...)，到 `AndroidManifest.xml`

```
<uses-permission android:name="android.permission.CAMERA"/>
```

### react-native调用

- 引包

```js
import ImagePicker from 'react-native-image-crop-picker';
```

- 调用

```js
ImagePicker.openPicker({
  multiple: true
})
.then(images => {
  // 这里将会获取到选中图片的数组
  // uploading file here ...
  console.log('images 数组：',images)
})
.catch((error)=>{
  console.log(error)
});
```
image对象包含如下内容：
```
data  : base64图片的数据
height  : 图片高度
mime  : mime类型
path  : 图片路径
size  : 图片大小
width : 图片宽度
```

### 上传

```js
// image 为单个图片对象
let form = new FormData();
let path = image.path;
let filename = path.substr(path.lastIndexOf('/')+1);

let file = {uri: path, type: 'multipart/form-data',name:filename};  
form.append('file',file);
// 调用fetch发送请求
fetch('Your_Url',{
  method:'POST',
  body:form,
  headers:{  
    'Content-Type':'multipart/form-data',  
  }
})
.then((response) => response.json())
.then(json => {
  // success goes here
})
.catch((error) => {
 // error goes here
})
```

### issues

*andriod调用插件时，可以打开相册，但点击选择图片后，`openPicker().then()` 没有被调用，也没有报错*

```
我自己覆写了 `onActivityResult`方法，导致没有返回,调用 `super.onActivityResult(...);` 解决
```

------

*ios显示文字本地化*

打开 xcode 中的 `info.plist` 选择 `Localization native development region` 为 本地语言(china)
