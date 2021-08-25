import React, { useContext } from "react";
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
import { Colors } from "../classes/Colors";

const NotesList = ({ notesFilteredByDate, mode, imagesPerRow, scrollable }) => {
  const modes = ["browse", "select", "display"];
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const outerSpacing = 3;
  const columnWidth = (windowWidth - outerSpacing * 2) / imagesPerRow;
  const scaleFactor = 2 / imagesPerRow;
  const textColor = "black";
  const noteColor =
    notesFilteredByDate.length > 0
      ? Colors.changeOpacity(notesFilteredByDate[0].schoolClass.primaryColor, 0.35)
      : "white";

  const selectedNotes = useContext(SelectedNotesContext);

  const NoteGroupButton = ({ style, noteGroup, navigation, disableButton }) => {
    var firstPage = noteGroup.notes[0];
    const documentIconContainerRadius = 10 * scaleFactor;

    return (
      <TouchableOpacity
        style={style}
        onPress={() => navigation.navigate("Edit Note", noteGroup)}
        disabled={disableButton}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ ...styles.title, fontSize: 16 * scaleFactor, color: textColor }}>
            {firstPage.title === "" ? "Untitled" : firstPage.title}
          </Text>
          <View
            style={{
              ...styles.documentIconContainer,
              height: documentIconContainerRadius * 2,
              paddingHorizontal: 8 * scaleFactor,
              borderRadius: documentIconContainerRadius,
            }}
          >
            {GeneralIcons.findIcon("Document", 12 * scaleFactor, textColor)}
            <Text
              style={{
                ...styles.numNotesInGroupText,
                color: textColor,
                fontSize: 12 * scaleFactor,
              }}
            >
              {noteGroup.notes.length}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 14 * scaleFactor, color: textColor }}>
          {firstPage.content === "" ? "" : firstPage.content}
        </Text>
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
        <Text style={{ ...styles.title, fontSize: 16 * scaleFactor }}>
          {note.title === "" ? "Untitled" : note.title}
        </Text>
        <Text style={{ fontSize: 14 * scaleFactor }}>
          {note.content === "" ? "" : note.content}
        </Text>
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

  return (
    <View
      style={
        scrollable === undefined || scrollable === true
          ? { flex: 1, paddingHorizontal: outerSpacing }
          : { paddingHorizontal: outerSpacing }
      }
    >
      <FlatList
        numColumns={imagesPerRow}
        data={notesFilteredByDate}
        scrollEnabled={scrollable !== undefined ? scrollable : true}
        ListHeaderComponent={() => <View style={{ marginBottom: 3 }} />}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => {
          return (
            <View style={{ width: columnWidth }}>
              <TouchableOpacity
                disabled={mode === modes[0] || mode === modes[2]}
                onPress={() => {
                  ItemArray.find(selectedNotes.state, "id", item.id) === undefined
                    ? selectedNotes.add({ id: item.id })
                    : selectedNotes.delete(item.id);
                }}
                style={{ margin: 3, height: columnWidth }}
              >
                {item instanceof ImageNote && (
                  <ImageButton
                    style={{
                      borderRadius: 10 * scaleFactor,
                      flex: 1,
                    }}
                    navigation={navigation}
                    note={item}
                    disableButton={mode === modes[1]}
                  />
                )}
                {item instanceof WrittenNote && (
                  <NoteButton
                    style={{
                      backgroundColor: noteColor,
                      borderRadius: 10 * scaleFactor,
                      padding: 10 * scaleFactor,
                      flex: 1,
                    }}
                    note={item}
                    navigation={navigation}
                    disableButton={mode === modes[1]}
                  />
                )}
                {item instanceof NoteGroup && (
                  <NoteGroupButton
                    style={{
                      backgroundColor: noteColor,
                      borderRadius: 10 * scaleFactor,
                      padding: 10 * scaleFactor,
                      flex: 1,
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
                    <View
                      style={{
                        position: "absolute",
                        right: 10 * scaleFactor,
                        bottom: 10 * scaleFactor,
                      }}
                    >
                      <View style={styles.checkContainter}>
                        <View style={styles.emptyCircle} />
                      </View>
                    </View>
                  )}
                {mode === modes[1] &&
                  ItemArray.find(selectedNotes.state, "id", item.id) !== undefined && (
                    <View
                      style={{
                        position: "absolute",
                        right: 10 * scaleFactor,
                        bottom: 10 * scaleFactor,
                      }}
                    >
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

const styles = StyleSheet.create({
  emptyCircle: {
    borderRadius: 10,
    borderWidth: 1.5,
    height: 20,
    width: 20,
    borderColor: "#147EFB",
  },
  title: {
    marginBottom: 4,
    fontWeight: "600",
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
    backgroundColor: "rgba(0,0,0,.25)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  numNotesInGroupText: { marginLeft: 1 },
});

export default NotesList;
