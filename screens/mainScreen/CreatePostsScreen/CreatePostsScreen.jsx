import React from 'react'
import { Camera, CameraType } from 'expo-camera';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { MaterialIcons, Feather  } from '@expo/vector-icons';
import { useState } from 'react';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import { Keyboard } from 'react-native';

const CreatePostsScreen = ({navigation}) => {
    const [camera, setCamera] = useState(null);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [photo, setPhoto] = useState('');
    const [photoTitle, setPhotoTitle] = useState("");
    const [photoLocation, setPhotoLocation] = useState(null)

    const takePhoto = async () => {
        if (camera) {
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const photo = await camera.takePictureAsync(options);
            const location = await Location.getCurrentPositionAsync();
            console.log('latitude', location.coords.latitude);
            console.log('longitude', location.coords.longitude);
            setPhoto(photo.uri);
            console.log("camera --->", photo.uri);
        }
    }

    const sendPhoto = () => {
        console.log('navigation', navigation);
        navigation.navigate('DefaultScreen', {photo,photoTitle});
    }

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
          setIsShowKeyboard(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
          setIsShowKeyboard(false);
        });
    
        return () => {
          showSubscription.remove();
          hideSubscription.remove();
        };
      }, []);

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
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
            <Camera style={styles.camera} ref={(ref) => setCamera(ref)}>
                    {photo && (<View style={styles.takePhotoContainer}>
                    <Image source={{uri: photo}} style={{height: 200, width: 200, borderRadius: 8,}} />
                    </View>)}
                    <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
                        <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
            </Camera>
            <View style={{ ...styles.inputWrapper, marginBottom: 16 }}>
                <TextInput
                    style={{ ...styles.input, ...styles.text }}
                    value={photoTitle}
                    onChangeText={setPhotoTitle}
                    placeholder={"Название..."}
                    placeholderTextColor="#BDBDBD"
                />
            </View>
            <View style={{ ...styles.inputWrapper, marginBottom: 16 }}>
                <Feather name='map-pin' size={24} color="#BDBDBD" style={styles.iconLocation} />
                <TextInput
                    style={{ ...styles.input, ...styles.text }}
                    value={photoLocation}
                    onChangeText={setPhotoLocation}
                    placeholder={"Местность..."}
                    placeholderTextColor="#BDBDBD"
                />
            </View>
            <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
                <Text style={styles.sendLabel}>Опубликовать</Text>
            </TouchableOpacity>    
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    camera: {
        height: 240,
        marginTop: 32,
        marginBottom: 32,
        borderRadius: 8,
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
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 0,
        borderBottomColor: "#E8E8E8",
        borderBottomWidth: 1,
    },
    input: {
        color: "#212121",
        padding: 0,
        width: "100%",
    },
    text: {
        fontSize: 16,
        lineHeight: 19,
        color: "#212121",
    },
    iconLocation: {
        marginRight: 4,
    },
    sendBtn: {
        marginTop: 32,
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