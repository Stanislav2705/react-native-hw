import React from "react"
import { StyleSheet, Text, View } from "react-native"
import MapView, { Marker } from "react-native-maps"

const MapScreen = ({ route }) => {
    console.log("route.params.location:", route.params.location);
    const { latitude, longitude } = route.params.location;

    return (
    <View style={styles.container}>
        <MapView style={{ flex: 1 }} initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            }}>
            <Marker title="travel photo" coordinate={{latitude,
            longitude}} />    
        </MapView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    }
})

export default MapScreen;
