import React from "react"
import { StyleSheet, Text, View } from "react-native"
import MapView from "react-native-maps"

const MapScreen = () => {
    <View style={styles.container}>
        <MapView style={{ flex: 1 }} initialRegion={{
            longitude: '47.9358651',
            latitude: '33.4094077',
            latitudeDelta: '',
            longitudeDelta: '',
        }}></MapView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default MapScreen;
