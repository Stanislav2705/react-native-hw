import { useFonts } from 'expo-font';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const initialState = {
    email: '',
    passworg: '',
}

SplashScreen.preventAutoHideAsync();

export default function LoginScreen() {
    const [isShowKeyboad, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const [dimensions, setDimesions] = useState(
        Dimensions.get('window').width - 16 * 2
    )

    useEffect(() => {
        const onChange = () => {
            const width = Dimensions.get('window').width - 16 * 2;

            setDimesions(width);
        }
        Dimensions.addEventListener('change', onChange);
        return () => {
            Dimensions.removeEventListner('change', onChange);
        }
    }, [])

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        console.log(state);
        setState(initialState);
    }

    const keyboardTouch = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    }

    const [fontsLoaded] = useFonts({
        'Roboto-Regular': require("../assets/fonts/Roboto-Regular.ttf"),
        'Roboto-Medium': require("../assets/fonts/Roboto-Medium.ttf"),
        'Roboto-Bold': require("../assets/fonts/Roboto-Bold.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
    
    if (!fontsLoaded) {
        return null;
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardTouch}>
        <View style={styles.container} onLayout={onLayoutRootView}>
            <ImageBackground style={styles.image} source={require('../assets/image/photo.jpg')}>
            <View style={styles.containerForm}>
                    <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                    
                    <View style={{
                        ...styles.form,
                        marginBottom: isShowKeyboad ? -60 : 180,
                        width: dimensions
                    }}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Войти</Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                textAlign={'left'}
                                placeholder={'Адрес электронной почты'}
                                placeholderTextColor={'#BDBDBD'}
                                onFocus={() => setIsShowKeyboard(true)}
                                value={state.email}
                                onChangeText={(value) => setState((prevState) => ({ ...prevState, email: value }))}
                                onSubmitEditing={keyboardHide}
                            />
                        </View>
                            <View style={{marginTop: 16}}>
                            <TextInput
                                style={styles.input}
                                textAlign={'left'}
                                secureTextEntry={!isPasswordVisible}
                                placeholder={'Пароль'}
                                placeholderTextColor={'#BDBDBD'}
                                onFocus={() => setIsShowKeyboard(true)}
                                value={state.passworg}
                                onChangeText={(value) => setState((prevState) => ({ ...prevState, passworg: value }))}
                                onSubmitEditing={keyboardHide}
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
                             <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={20} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.btn}
                            onPress={keyboardHide}
                        >
                            <Text style={styles.btnTitle}>Войти</Text>
                        </TouchableOpacity>
                    </View>
                    
                    </KeyboardAvoidingView>
                    </View>
            </ImageBackground>
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    containerForm: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        padding: 16,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        borderRadius: 8,
        backgroundColor: '#F6F6F6',
    },
    icon: {
        position: 'absolute',
        paddingTop: 22,
        paddingRight: 16,
        right: 0
    },
    form: {
        marginBottom: 180,
        paddingTop: 32,
    },
    btn: {
        borderWidth: 1,
        borderRadius: 50,
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        backgroundColor: '#FF6C00',
        borderColor: 'transparent',
    },
    btnTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        padding: 16,
        fontFamily: 'Roboto-Regular',
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    headerTitle: {
        fontSize: 30,
        color: '#212121',
        fontFamily: 'Roboto-Medium',
    }
})