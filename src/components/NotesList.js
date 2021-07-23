import React, { useContext, useState } from "react";
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

const NotesList = ({ notesFilteredByDate }) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const outerSpacing = 3;
  const imagesPerRow = 2;
  const columnWidth = windowWidth / imagesPerRow - outerSpacing;

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
                <ImageButton
                  style={{ flex: 0.5 }}
                  navigation={navigation}
                  note={item}
                  toggleSelectImage={(uri) => images.toggleSelectImage(uri)}
                />
              )}
              {item instanceof WrittenNote && (
                <NoteButton
                  style={{
                    ...styles.note,
                    backgroundColor: item.schoolClass.primaryColor,
                  }}
                  note={item}
                  navigation={navigation}
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const NoteButton = ({ style, note, navigation }) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={() => navigation.navigate("Edit Note", note)}
    >
      <Text style={styles.title}>{note.title === "" ? "Untitled" : note.title}</Text>
      <Text style={styles.text}>{note.content === "" ? "" : note.content}</Text>
    </TouchableOpacity>
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
  text: {
    fontSize: 14,
    height: 170,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
  },
  note: {
    flex: 0.5,
    margin: 3,
    height: 200,
    borderRadius: 10,
    padding: 10,
  },
});

export default NotesList;
