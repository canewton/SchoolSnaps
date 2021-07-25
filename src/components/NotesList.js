import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WrittenNote } from "../classes/WrittenNote";
import { ImageNote } from "../classes/ImageNote";
import { GeneralIcons } from "../icons/GeneralIcons";
import { ItemArray } from "../classes/ItemArray";
import { NoteGroup } from "../classes/NoteGroup";
import { Context as SelectedNotesContext } from "../context/SelectedNotesContext";

const NotesList = ({ notesFilteredByDate, mode }) => {
  const modes = ["browse", "select"];
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const outerSpacing = 3;
  const imagesPerRow = 2;
  const columnWidth = windowWidth / imagesPerRow - outerSpacing;

  const selectedNotes = useContext(SelectedNotesContext);

  return (
    <View style={{ flex: 1, paddingHorizontal: outerSpacing }}>
      <FlatList
        numColumns={imagesPerRow}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={notesFilteredByDate}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => {
          return (
            <View style={{ width: columnWidth }}>
              <TouchableOpacity
                disabled={mode === modes[0]}
                onPress={() => {
                  ItemArray.find(selectedNotes.state, "id", item.id) === undefined
                    ? selectedNotes.add({ id: item.id })
                    : selectedNotes.delete(item.id);
                }}
                style={styles.note}
              >
                {item instanceof ImageNote && (
                  <ImageButton
                    style={{ flex: 0.5 }}
                    navigation={navigation}
                    note={item}
                    disableButton={mode === modes[1]}
                  />
                )}
                {item instanceof WrittenNote && (
                  <NoteButton
                    style={{
                      backgroundColor: item.schoolClass.primaryColor,
                      borderRadius: 10,
                      padding: 10,
                    }}
                    note={item}
                    navigation={navigation}
                    disableButton={mode === modes[1]}
                  />
                )}
                {item instanceof NoteGroup && (
                  <NoteGroupButton
                    style={{
                      backgroundColor: item.schoolClass.primaryColor,
                      borderRadius: 10,
                      padding: 10,
                    }}
                    noteGroup={item}
                    navigation={navigation}
                    disableButton={mode === modes[1]}
                  />
                )}

                {/* when the user is in select mode, 
                checkmarks appear on the note when the user presses it */}
                {mode === modes[1] &&
                  ItemArray.find(selectedNotes.state, "id", item.id) === undefined && (
                    <View style={{ position: "absolute", right: 10, bottom: 0 }}>
                      <View style={styles.checkContainter}>
                        <View style={styles.emptyCircle} />
                      </View>
                    </View>
                  )}
                {mode === modes[1] &&
                  ItemArray.find(selectedNotes.state, "id", item.id) !== undefined && (
                    <View style={{ position: "absolute", right: 10, bottom: 0 }}>
                      <View style={styles.checkContainter}>
                        {GeneralIcons.findIcon("Checkmark Circle", 24, "#147EFB")}
                      </View>
                    </View>
                  )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const NoteGroupButton = ({ style, noteGroup, navigation, disableButton }) => {
  var firstPage = noteGroup.notes[0];

  return (
    <TouchableOpacity
      style={style}
      onPress={() => navigation.navigate("Edit Note", noteGroup)}
      disabled={disableButton}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>
          {firstPage.title === "" ? "Untitled" : firstPage.title}
        </Text>
        <View style={styles.documentIconContainer}>
          {GeneralIcons.findIcon("Document", 12, "black")}
          <Text style={{ fontSize: 10, marginLeft: 1 }}>{noteGroup.notes.length}</Text>
        </View>
      </View>
      <Text style={styles.text}>{firstPage.content === "" ? "" : firstPage.content}</Text>
    </TouchableOpacity>
  );
};

const NoteButton = ({ style, note, navigation, disableButton }) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={() =>
        navigation.navigate("Edit Note", {
          notes: new Array(note),
          schoolClass: note.schoolClass,
          id: note.id,
        })
      }
      disabled={disableButton}
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

const documentIconContainerRadius = 10;

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
    marginVertical: 9,
    height: 200,
  },
  emptyCircle: {
    borderRadius: 10,
    borderWidth: 1.5,
    height: 20,
    width: 20,
    borderColor: "#147EFB",
  },
  checkContainter: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
  },
  documentIconContainer: {
    height: documentIconContainerRadius * 2,
    paddingHorizontal: 8,
    borderRadius: documentIconContainerRadius,
    backgroundColor: "rgba(0,0,0,.25)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default NotesList;
