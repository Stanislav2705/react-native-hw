import React from 'react'
import { Camera, CameraType } from 'expo-camera';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const CreatePostsScreen = () => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState('');

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync()
        console.log("camera --->", photo.uri);
        setPhoto(photo.uri)
    }
  return (
      <View style={styles.container}>
          <Camera style={styles.camera} ref={setCamera}>
                {photo && (<View style={styles.takePhotoContainer}>
                  <Image source={{uri: photo}} style={{height: 200, width: 200}} />
                </View>)}
                <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
                    <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
                </TouchableOpacity>
          </Camera>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    camera: {
        flex: 1,
        // height: 240,
        // marginTop: 32,
        // marginHorizontal: 16,
        alignItems: 'center',
    },
    snap: {
        // color: "#fff"
    },
    snapContainer: {
        marginTop: 490,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: '#fff',
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    takePhotoContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderColor: '#fff',
        borderWidth: 1,
        height: 200,
        width: 200,
    }
})

export default CreatePostsScreen;