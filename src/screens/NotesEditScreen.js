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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.cameraButtonsContainer}>
          <CloseButton
            onPressCallback={() => {
              if (noteGroupID !== null) {
                notes.edit({ id: noteGroupID, notes: notesOnScreen });
              }
              navigation.pop();
            }}
          />
          {!notesAreEditable && (
            <EditButton onPressCallback={() => setNotesAreEditable(true)} />
          )}
          {notesAreEditable && (
            <StopEdittingButton onPressCallback={() => setNotesAreEditable(false)} />
          )}
        </View>
      </TouchableWithoutFeedback>
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

const CloseButton = ({ onPressCallback }) => {
  return (
    <TouchableOpacity onPress={() => onPressCallback()} style={styles.button}>
      {GeneralIcons.findIcon("Close", 28, "white")}
    </TouchableOpacity>
  );
};

const EditButton = ({ onPressCallback }) => {
  return (
    <TouchableOpacity onPress={() => onPressCallback()} style={styles.button}>
      {GeneralIcons.findIcon("Edit Circle", 28, "white")}
    </TouchableOpacity>
  );
};

const StopEdittingButton = ({ onPressCallback }) => {
  return (
    <TouchableOpacity onPress={() => onPressCallback()} style={styles.button}>
      {GeneralIcons.findIcon("Done", 28, "white")}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cameraButtonsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 80,
    justifyContent: "space-between",
  },
  button: {
    marginBottom: 15,
    marginHorizontal: 15,
  },
});

export default NotesEditScreen;
