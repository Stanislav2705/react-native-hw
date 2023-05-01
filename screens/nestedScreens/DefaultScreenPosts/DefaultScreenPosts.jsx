import React, { useEffect, useState } from 'react'
import { FlatList,Button, Image, StyleSheet, View, Text } from 'react-native'
  

const DefaultScreenPosts = ({ route, navigation }) => {
    const [posts, setPosts] = useState([]);
    console.log("route.params", route.params);

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params]);
        }
    }, [route.params]);
    console.log("posts", posts);
    
    return (
        <View style={styles.container}>
        <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View
                    style={{
                        marginBottom: 10,
                        // justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'left'
                    }}
                >
                    <Image
                        source={{ uri: item.photo }}
                        style={{ width: 350, height: 240, borderRadius: 8,marginTop: 32 }}
                    />
                    <Text style={styles.title}>{item.photoTitle}</Text>
                    <View style={styles.navigation}>
                        <Button
                            title="go to map"
                            onPress={() => navigation.navigate("Map", {location: item.location})}
                        />
                        <Button
                            title="go to comments"
                            onPress={() => navigation.navigate("Comments", {postId: item.id})}
                        />
                    </View>
                </View>
            )}
            />
        </View>     
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    title: {
        fontFamily: 'Roboto-Medium',
        color: '#212121',
        marginVertical: 8,
        marginRight: 270
    },
    navigation: {
        marginHorizontal: 0,
    }
})

export default DefaultScreenPosts;