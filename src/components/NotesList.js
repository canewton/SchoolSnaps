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
                />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const NoteButton = ({ style, note }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  return (
    <View style={style}>
      <TextInput
        value={title}
        style={styles.titleInput}
        placeholder="Untitled"
        onChangeText={(text) => setTitle(text)}
        onEndEditing={() => {
          note.title = title;
        }}
      />
      <TextInput
        value={content}
        style={styles.input}
        placeholder="Start Typing Here..."
        onChangeText={(text) => setContent(text)}
        multiline={true}
        scrollEnabled={false}
        onEndEditing={() => {
          note.content = content;
        }}
      />
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
    fontSize: 14,
    height: 170,
  },
  titleInput: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
  },
  note: {
    flex: 0.5,
    margin: 3,
    height: 200,
    borderRadius: 10,
    padding: 6,
  },
});

export default NotesList;
