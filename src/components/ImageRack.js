import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

const ImageRack = ({ recentImages }) => {
  return (
    <View style={styles.imageRack}>
      <FlatList
        data={recentImages}
        keyExtractor={(image) => image}
        horizontal
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => console.log("pressed")}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  alignSelf: "flex-start",
                }}
                source={{
                  uri: item,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
      <View style={{ justifyContent: "center", flex: 1 }}>
        <TouchableOpacity>
          <Text style={[styles.editButton, { color: "gray" }]}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageRack: {
    height: 50,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  editButton: {
    fontSize: 16,
    alignSelf: "flex-end",
    marginRight: 15,
    fontWeight: "400",
  },
});

export default ImageRack;
