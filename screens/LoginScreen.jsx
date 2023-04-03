import React from 'react'
import { ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native'

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={require('../assets/image/photo.jpg')}>
                <View style={styles.form}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Регестрация</Text>
                    </View>
                    <View>
                        <TextInput style={styles.input} textAlign={'center'} />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        height: 40,
        borderRadius: 6,
        backgroundColor: '#F6F6F6'
    },
    form: {
        marginHorizontal: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    headerTitle: {
        fontSize: 30,
        color: '#212121',
    }
})