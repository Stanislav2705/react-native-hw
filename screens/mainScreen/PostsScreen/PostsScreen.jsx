import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'

const PostsScreen = ({ route }) => {
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
              keyExtractor={(item, indx) => indx.toString()}
              renderItem={({ item }) => (
                  <View
                      style={{
                          marginBottom: 10,
                          justifyContent: 'center',
                          alignItems: 'center'
                      }}
                  >
                      <Image
                          source={{ uri: item.photo }}
                          style={{ width: 350, height: 240, borderRadius: 8 }}
                      />
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
    }
})

export default PostsScreen;