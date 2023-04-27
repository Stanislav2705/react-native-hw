import React from 'react'
import { Camera, CameraType } from 'expo-camera';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import * as Location from 'expo-location';
import { useEffect } from 'react';

const CreatePostsScreen = ({navigation}) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState('');

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();
        const location = await Location.getCurrentPositionAsync();
        console.log('latitude', location.coords.latitude);
        console.log('longitude', location.coords.longitude);
        setPhoto(photo.uri);
        console.log("camera --->", photo.uri);
    }

    const sendPhoto = () => {
        console.log('navigation', navigation);
        navigation.navigate('DefaultScreen', {photo});
    }

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
        })();
      }, []);

  return (
      <View style={styles.container}>
          <Camera style={styles.camera} ref={setCamera}>
                {photo && (<View style={styles.takePhotoContainer}>
                  <Image source={{uri: photo}} style={{height: 200, width: 200, borderRadius: 8,}} />
                </View>)}
                <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
                    <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
                </TouchableOpacity>
          </Camera>
          <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
            <Text style={styles.sendLabel}>Опубликовать</Text>
          </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        height: 240,
        marginTop: 32,
        borderRadius: 8,
        marginHorizontal: 16,
        alignItems: 'center',
    },
    snap: {
        // color: "#fff"
    },
    snapContainer: {
        marginTop: 90,
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
        height: 100,
        width: 200,
        borderRadius: 8,
    },
    sendBtn: {
        marginTop: 32,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: 'transparent',
        height: 50,
        backgroundColor: "#FF6C00",
        justifyContent: "center",
        alignItems: 'center',
    },
    sendLabel: {
        fontFamily: 'Roboto-Regular',
        color: '#FFFFFF'
    }
})

export default CreatePostsScreen;