import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
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

const NotesEditScreen = ({ route }) => {
  useEffect(() => {
    LogBox.ignoreLogs([
      "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary.",
    ]);
  }, []);

  const navigation = useNavigation();
  const notes = useContext(NotesContext);
  const noteGroup = route.params;
  const [notesOnScreen, setNotesOnScreen] = useState(noteGroup.notes);
  const [notesAreEditable, setNotesAreEditable] = useState(false);
  const [noteGroupID, setNoteGroupID] = useState(
    noteGroup instanceof NoteGroup ? noteGroup.id : null
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
                  : notes.delete(noteGroup.id);
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
              <TouchableOpacity onLongPress={drag}>
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
              </TouchableOpacity>
            </TouchableWithoutFeedback>
          );
        }}
      />
      <FloatingActionButton
        schoolClass={noteGroup.schoolClass}
        onPressPhoto={() => navigation.navigate("Camera", noteGroup.schoolClass)}
        onPressNote={() => {
          var note = new WrittenNote(noteGroup.schoolClass, "", "");
          if (noteGroup instanceof NoteGroup) {
            notes.edit({ id: noteGroupID, notes: [...notesOnScreen, note] });
            setNotesOnScreen([...notesOnScreen, note]);
          } else {
            if (noteGroupID === null) {
              var addedNoteGroup = new NoteGroup(noteGroup.schoolClass, [
                ...notesOnScreen,
                note,
              ]);
              notes.add(addedNoteGroup);
              notes.delete(noteGroup.id);
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
});

export default NotesEditScreen;
