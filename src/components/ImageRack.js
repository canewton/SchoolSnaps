import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ImageRack = ({ recentImages }) => {
  return (
    <View>
      <FlatList
        data={recentImages}
        keyExtractor={(image) => image}
        horizontal
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => console.log("pressed")}>
              <Image style={styles.image} source={{ uri: item }} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    alignSelf: "flex-start",
  },
});

export default ImageRack;
