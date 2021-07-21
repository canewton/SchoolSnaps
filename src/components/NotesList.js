import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WrittenNote } from "../classes/WrittenNote";
import { ImageNote } from "../classes/ImageNote";

const imagesPerRow = 2;

const NotesList = ({ notesFilteredByDate }) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const outerSpacing = 3;
  const columnWidth = windowWidth / 2 - outerSpacing;

  return (
    <View style={{ flex: 1, paddingHorizontal: outerSpacing }}>
      <FlatList
        numColumns={imagesPerRow}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={notesFilteredByDate}
        keyExtractor={(image) => image.id + ""}
        renderItem={({ item }) => {
          return (
            <View style={{ width: columnWidth }}>
              {item instanceof ImageNote && (
                <ImageUnit
                  style={{ flex: 0.5 }}
                  navigation={navigation}
                  note={item}
                  toggleSelectImage={(uri) => images.toggleSelectImage(uri)}
                />
              )}
              {item instanceof WrittenNote && (
                <NoteUnit
                  style={{
                    flex: 0.5,
                    backgroundColor: item.schoolClass.primaryColor,
                    margin: 3,
                    height: 200,
                    borderRadius: 10,
                    padding: 5,
                  }}
                  note={item}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const NoteUnit = (props) => {
  return (
    <View style={props.style}>
      <TextInput
        value={props.note.title}
        style={styles.input}
        placeholder="Untitled"
        //onChangeText={(text) => setName(text)}
      />
      <TextInput
        value={props.note.content}
        style={styles.input}
        placeholder="Start Typing Here..."
        //onChangeText={(text) => setName(text)}
      />
    </View>
  );
};

const ImageUnit = (props) => {
  return (
    <View style={props.style}>
      <TouchableOpacity
        onPress={
          //if this image is pressed and the mode is not "select", enter fullscreen
          //if this image is pressed and the mode is "select",
          //change the select property in the image context
          props.mode !== "select"
            ? () =>
                props.navigation.navigate("FullscreenStack", {
                  uri: props.item,
                })
            : () => {
                props.toggleSelectImage(props.item.uri);
              }
        }
      >
        <Image source={{ uri: props.note.uri }} />
      </TouchableOpacity>
    </View>
  );
};

const ImageButton = (props) => {
  return (
    <View style={props.style}>
      <TouchableOpacity
        onPress={
          //if this image is pressed and the mode is not "select", enter fullscreen
          //if this image is pressed and the mode is "select",
          //change the select property in the image context
          props.mode !== "select"
            ? () =>
                props.navigation.navigate("FullscreenStack", {
                  uri: props.item,
                })
            : () => {
                props.toggleSelectImage(props.item.uri);
              }
        }
      >
        <Image source={{ uri: props.note.uri }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCircle: {
    borderRadius: 10,
    borderWidth: 1.5,
    height: 20,
    width: 20,
    borderColor: "#147EFB",
  },
  input: {
    fontSize: 16,
  },
});

export default NotesList;
