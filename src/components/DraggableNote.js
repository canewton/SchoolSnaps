import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import WrittenNoteForm from "../components/WrittenNoteForm";
import { WrittenNote } from "../classes/WrittenNote";
import { Context as NotesContext } from "../context/NotesContext";
import Lightbox from "react-native-lightbox";
import { Colors } from "../classes/Colors";
import HeaderIconButton from "./HeaderIconButton";

const DraggableNote = ({ onLongPress, isDraggable, note, deleteNote }) => {
  const notes = useContext(NotesContext);
  const [notesAreEditable, setNotesAreEditable] = useState(false);
  const [isFullscreened, setIsFullscreened] = useState(false);
  const [deleteNoteBool, setDeleteNoteBool] = useState(false);
  const fullscreenNoteHeight = Dimensions.get("window").height;
  const defaultNoteHeight = 300;

  //Change the style of the note when it is not fullscreened and when it is fullscreened
  const WrittenNoteThatCanBeFullscreened = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={isFullscreened}>
        <WrittenNoteForm
          initialContent={note.content}
          initialTitle={note.title}
          onChange={(title, content) => note.changeText(title, content)}
          editable={notesAreEditable}
          noteContainerStyle={
            isFullscreened
              ? styles.fullscreenNoteContainerStyle
              : { height: defaultNoteHeight }
          }
          titleInputStyle={isFullscreened ? styles.fullscreenTitleInputStyle : {}}
        />
      </ScrollView>
    );
  };

  //Put buttons on the header of the note group
  const FullscreenHeader = ({ onCloseCallback }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 57,
          justifyContent: "space-between",
          marginRight: 10,
        }}
      >
        <HeaderIconButton
          callback={() => onCloseCallback()}
          color="gray"
          iconName="Back"
        />
        <HeaderIconButton
          callback={() => {
            setDeleteNoteBool(true);
            onCloseCallback();
          }}
          color="gray"
          iconName="Delete"
          size={22}
        />
      </View>
    );
  };

  return (
    /* Allow the note to become fullscreened when the user taps it */
    <Lightbox
      underlayColor="white"
      swipeToDismiss={false}
      onLongPress={() => {
        if (onLongPress !== undefined) {
          onLongPress();
        }
      }}
      onOpen={() => {
        setIsFullscreened(true);
        setNotesAreEditable(true);
      }}
      willClose={() => {
        setIsFullscreened(false);
        setNotesAreEditable(false);
        notes.edit({ id: note.id, title: note.title, content: note.content });
      }}
      onClose={() => {
        if (deleteNoteBool === true) {
          deleteNote(note);
        }
      }}
      renderHeader={(close) => <FullscreenHeader onCloseCallback={close} />}
      renderContent={() => <WrittenNoteThatCanBeFullscreened />}
    >
      <View style={{ ...(isDraggable ? Colors.shadow : styles.nonDraggableNote) }}>
        <View
          style={{
            height: isFullscreened ? fullscreenNoteHeight : defaultNoteHeight,
            overflow: "hidden",
          }}
        >
          {note instanceof WrittenNote && <WrittenNoteThatCanBeFullscreened />}
        </View>
      </View>
    </Lightbox>
  );
};

const styles = StyleSheet.create({
  deleteButtonContainter: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
  },
  fullscreenNoteContainerStyle: { paddingTop: 100 },
  fullscreenTitleInputStyle: {
    fontSize: 22,
    marginBottom: 12,
  },
  nonDraggableNote: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderColor,
  },
});

export default DraggableNote;
