import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LogBox,
} from "react-native";
import WrittenNoteForm from "../components/WrittenNoteForm";
import { Context as NotesContext } from "../context/NotesContext";
import { GeneralIcons } from "../icons/GeneralIcons";
import { Keyboard } from "react-native";
import { WrittenNote } from "../classes/WrittenNote";
import FloatingActionButton from "../components/FloatingActionButton";
import { NoteGroup } from "../classes/NoteGroup";
import DraggableFlatList from "react-native-draggable-flatlist";
import { ItemArray } from "../classes/ItemArray";

const NotesEditScreen = ({ route }) => {
  useEffect(() => {
    LogBox.ignoreLogs([
      "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary.",
    ]);
  }, []);

  const navigation = useNavigation();
  const notes = useContext(NotesContext);
  const initialValues = route.params;
  const [notesOnScreen, setNotesOnScreen] = useState(initialValues.notes);
  const [notesAreEditable, setNotesAreEditable] = useState(false);
  const [noteGroupID, setNoteGroupID] = useState(
    initialValues instanceof NoteGroup ? initialValues.id : null
  );
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Header with buttons */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.cameraButtonsContainer}>
          <IconButton
            onPressCallback={() => {
              if (noteGroupID !== null) {
                notes.edit({ id: noteGroupID, notes: notesOnScreen });
              }
              navigation.pop();
            }}
            iconName="Close"
          />
          <View style={{ flexDirection: "row" }}>
            {!notesAreEditable && (
              <IconButton
                onPressCallback={() => setNotesAreEditable(true)}
                iconName="Edit Circle"
              />
            )}
            {notesAreEditable && (
              <IconButton
                onPressCallback={() => setNotesAreEditable(false)}
                iconName="Done"
              />
            )}
            <IconButton
              onPressCallback={() => console.log("bookmark")}
              iconName="Bookmark"
            />
            <IconButton
              onPressCallback={() => {
                noteGroupID !== null
                  ? notes.delete(noteGroupID)
                  : notes.delete(initialValues.id);
                navigation.pop();
              }}
              iconName="Delete"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Notes List */}
      <DraggableFlatList
        data={notesOnScreen}
        keyExtractor={(item) => item.id + ""}
        ListFooterComponent={() => <View style={{ height: 160 }} />}
        onDragEnd={({ data }) => {
          notes.edit({ id: noteGroupID, notes: data });
          setNotesOnScreen(data);
        }}
        renderItem={({ item, drag, isActive }) => {
          return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <TouchableOpacity onLongPress={drag} activeOpacity={1}>
                <View style={{ flex: 1, margin: 15 }}>
                  {item instanceof WrittenNote && (
                    <WrittenNoteForm
                      initialValues={item}
                      onChange={(title, content) => {
                        if (noteGroupID === null) {
                          notes.edit({ id: item.id, title, content });
                        } else {
                          item.changeText(title, content);
                        }
                      }}
                      editable={notesAreEditable}
                      opacity={isActive ? 0.6 : 1}
                    />
                  )}

                  {/* Make a delete button that either deletes a note from a note group
                  or deletes a single note and then navigates back to the notes screen */}
                  <TouchableOpacity
                    style={{ position: "absolute", right: 10, bottom: 14 }}
                    onPress={() => {
                      if (noteGroupID === null) {
                        /* The edit screen is displaying a single note */
                        notes.delete(item.id);
                        navigation.pop();
                      } else {
                        /* The edit screen is displaying a note group */
                        var newNotesList = ItemArray.remove(notesOnScreen, item.id);
                        if (notesOnScreen.length === 2) {
                          /* Convert the note group into a single note */
                          notes.add(newNotesList[0]);
                          notes.delete(noteGroupID);
                          setNotesOnScreen(newNotesList);
                          setNoteGroupID(null);
                        } else {
                          /* Remove a note from the note group */
                          setNotesOnScreen(newNotesList);
                          notes.edit({ id: noteGroupID, notes: newNotesList });
                        }
                      }
                    }}
                  >
                    <View style={styles.deleteButtonContainter}>
                      {GeneralIcons.findIcon("Delete", 20, "rgba(0,0,0,.5)")}
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </TouchableWithoutFeedback>
          );
        }}
      />

      {/* Floating action button to add notes */}
      <FloatingActionButton
        schoolClass={initialValues.schoolClass}
        onPressPhoto={() => navigation.navigate("Camera", initialValues.schoolClass)}
        /* if the user adds a note to a singular note, turn the singular note into a note group
        if the user adds a note to a note group, edit the notes property of the note group */
        onPressNote={() => {
          var note = new WrittenNote(Date.now(), initialValues.schoolClass, "", "");
          if (initialValues instanceof NoteGroup) {
            notes.edit({ id: noteGroupID, notes: [...notesOnScreen, note] });
            setNotesOnScreen([...notesOnScreen, note]);
          } else {
            if (noteGroupID === null) {
              var addedNoteGroup = new NoteGroup(Date.now(), initialValues.schoolClass, [
                ...notesOnScreen,
                note,
              ]);
              notes.add(addedNoteGroup);
              notes.delete(initialValues.id);
              setNoteGroupID(addedNoteGroup.id);
              setNotesOnScreen([...notesOnScreen, note]);
            } else {
              notes.edit({ id: noteGroupID, notes: [...notesOnScreen, note] });
              setNotesOnScreen([...notesOnScreen, note]);
            }
          }
        }}
      />
    </View>
  );
};

const IconButton = ({ iconName, onPressCallback }) => {
  return (
    <TouchableOpacity onPress={() => onPressCallback()} style={styles.button}>
      {GeneralIcons.findIcon(iconName, 25, "white")}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cameraButtonsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 100,
    justifyContent: "space-between",
  },
  button: {
    marginBottom: 15,
    marginHorizontal: 20,
  },
  deleteButtonContainter: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
  },
});

export default NotesEditScreen;
