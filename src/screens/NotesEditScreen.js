import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, LogBox } from "react-native";
import { Context as NotesContext } from "../context/NotesContext";
import { GeneralIcons } from "../icons/GeneralIcons";
import { WrittenNote } from "../classes/WrittenNote";
import FloatingActionButton from "../components/FloatingActionButton";
import { NoteGroup } from "../classes/NoteGroup";
import DraggableFlatList from "react-native-draggable-flatlist";
import HeaderIconButton from "../components/HeaderIconButton";
import { Colors } from "../classes/Colors";
import DraggableNote from "../components/DraggableNote";

const NotesEditScreen = ({ route }) => {
  useEffect(() => {
    LogBox.ignoreLogs([
      "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary.",
      "Animated.event now requires a second argument for options",
      "Animated: `useNativeDriver`",
    ]);
  }, []);

  const navigation = useNavigation();
  const notes = useContext(NotesContext);
  const initialValues = route.params;
  const [notesOnScreen, setNotesOnScreen] = useState(initialValues.notes);
  const [noteGroupID, setNoteGroupID] = useState(
    initialValues instanceof NoteGroup ? initialValues.id : null
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          <HeaderIconButton
            color="white"
            iconName="Back"
            callback={() => {
              if (noteGroupID !== null) {
                notes.edit({ id: noteGroupID, notes: notesOnScreen });
              }
              navigation.pop();
            }}
          />
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
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
      ),
    });
  });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
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
            <DraggableNote
              onLongPress={() => drag}
              isDraggable={isActive}
              note={item}
              noteGroupID={noteGroupID}
            />
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
      {GeneralIcons.findIcon(iconName, 22, "white")}
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
    marginHorizontal: 20,
  },
});

export default NotesEditScreen;
