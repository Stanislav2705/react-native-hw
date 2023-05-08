import React from 'react'
import { useState, useEffect } from 'react';
import { KeyboardAvoidingView,Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Camera } from 'expo-camera';
import { MaterialIcons, Feather  } from '@expo/vector-icons';
import * as Location from 'expo-location';

const CreatePostsScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [camera, setCamera] = useState(null);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [photo, setPhoto] = useState('');
    const [photoTitle, setPhotoTitle] = useState("");
    const [photoLocation, setPhotoLocation] = useState(null);
    const [location, setLocation] = useState(null);
    const [isFocused, setIsFocused] = useState(true);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            console.log("status", status);
            setHasPermission(status === "granted");
        })();
    }, []);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
            
          let location = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
          setLocation(coords);
        })();
      }, []);

    useEffect(() => {
        const unsubscribeFocus = navigation.addListener('focus', () => {
            setIsFocused(true);
        });

        const unsubscribeBlur = navigation.addListener("blur", () => {
            setIsFocused(false);
            setIsPreview(false);

            setPhotoTitle("");
            setPhotoLocation("");
        });

        return () => {
            unsubscribeFocus();
            unsubscribeBlur();
        }
    }, [navigation]);

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
    
    const onCameraReady = () => {
        setIsCameraReady(true);
    }

    const takePhoto = async () => {
        if (camera) {
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const photo = await camera.takePictureAsync(options);
            const location = await Location.getCurrentPositionAsync();
            console.log('latitude', location.coords.latitude);
            console.log('longitude', location.coords.longitude);
            if (photo.uri) {
                await camera.pausePreview();
                setIsPreview(true);
                setPhoto(photo.uri);
            }
            console.log("camera --->", photo.uri);
        }
    }

    const switchCamera = () => {
        if (isPreview) {
            return;
        }
        setCameraType((prevCameraType) =>
          prevCameraType === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
    };

    const cancelPreview = async () => {
        await camera.resumePreview();
        setIsPreview(false);
        setPhoto(null);
    };

    const renderCancelPreviewButton = () => (
        <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
            <MaterialIcons name='close' size={24} color='white' />
        </TouchableOpacity>
    );

    const renderCaptureControl = () => (
        <View style={styles.control}>
            <TouchableOpacity
                disabled={!isCameraReady}
                onPress={switchCamera}
                style={styles.captureWrapper}
            >
                <View style={styles.capture} />
                <MaterialIcons
                    name='flip-camera-android'
                    size={24}
                    color='white'
                    style={styles.captureIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.2}
                disabled={!isCameraReady}
                onPress={takePhoto}
                style={styles.captureWrapper}
            >
                <View style={styles.capture} />
                <MaterialIcons
                    name='photo-camera'
                    size={24}
                    color='white'
                    style={styles.captureIcon}
                />
            </TouchableOpacity>
        </View>
    )

    if (hasPermission === null) {
        return <View />;
    }
    
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };

    const sendPhoto = async () => {
        if (!photo || !photoTitle) {
            console.log("Add photo,title and location");
            return;
        }
        console.log('navigation', navigation);
        navigation.navigate('DefaultScreen', {photo,photoTitle});
    }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
             {!isShowKeyboard && ( <>   
            <View style={styles.cameraWrapper}>
            {isFocused && (
                <Camera
                style={styles.camera}
                ref={(ref) => setCamera(ref)}
                type={cameraType}
                onCameraReady={onCameraReady}
                onMountError={(error) => {
                    console.log("camera error", error);
                }}              
                />
            )}
            {isPreview && renderCancelPreviewButton()}
            {!isPreview && renderCaptureControl()}              
            </View>
            <TouchableOpacity activeOpacity={0.8} style={{marginBottom: 32}}>      
                <Text style={{...styles.text, color: "#BDBDBD"}}>
                    {photo ? "Редагувати фото" : "Завантажити фото"}
                </Text>
            </TouchableOpacity>
            </>         
            )} 
            <View style={{ ...styles.inputWrapper, marginBottom: 16 }}>
                <TextInput
                    style={{ ...styles.input, ...styles.text }}
                    value={photoTitle}
                    onChangeText={setPhotoTitle}
                    placeholder={"Назва..."}
                    placeholderTextColor="#BDBDBD"
                />
            </View>
            <View style={{ ...styles.inputWrapper, marginBottom: 16 }}>
                <Feather name='map-pin' size={24} color="#BDBDBD" style={styles.iconLocation} />
                <TextInput
                    style={{ ...styles.input, ...styles.text }}
                    value={photoLocation}
                    onChangeText={setPhotoLocation}
                    placeholder={"Місцина..."}
                    placeholderTextColor="#BDBDBD"
                />
            </View>
            {!isShowKeyboard && (      
            <TouchableOpacity activeOpacity={0.8} onPress={sendPhoto} style={{...styles.sendBtn, backgroundColor: !photo || !photoTitle || !photoLocation ? "#F6F6F6" : "#FF6C00"}}>
                <Text style={{...styles.sendLabel, color: !photo || !photoTitle || !photoLocation ? "#BDBDBD" : "#FFFFFF" }}>Опублікувати</Text>
            </TouchableOpacity>  
            )}          
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    cameraWrapper: {
        position: 'relative',
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 8,
    },
    camera: {
        height: 240,
        // marginTop: 32,
        // marginBottom: 8,
        // borderRadius: 8,
        // alignItems: 'center',
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
    },
    closeButton: {
        position: 'absolute',
        top: 6,
        right: 6,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
    },
    control: {
        position: "absolute",
        top: 90,
        alignSelf: "center",
        flexDirection: "row",
        width: 130,
        justifyContent: "space-between",
    },
    captureWrapper: {
        justifyContent: "center",
        alignItems: "center",
    },
    capture: {
        backgroundColor: "#ffffff",
        borderRadius: 50,
        height: 60,
        width: 60,
        opacity: 0.3,
    },
    captureIcon: {
        position: "absolute",
    },
})

export default CreatePostsScreen;