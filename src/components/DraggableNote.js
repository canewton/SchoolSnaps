import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WrittenNoteForm from "../components/WrittenNoteForm";
import { WrittenNote } from "../classes/WrittenNote";
import { Context as NotesContext } from "../context/NotesContext";
import Lightbox from "react-native-lightbox";
import { Colors } from "../classes/Colors";
import { GeneralIcons } from "../icons/GeneralIcons";
import { ItemArray } from "../classes/ItemArray";

const DraggableNote = ({ onLongPress, isDraggable, note, noteGroupID }) => {
  const notes = useContext(NotesContext);
  const navigation = useNavigation();
  const [notesAreEditable, setNotesAreEditable] = useState(false);
  const [isFullscreened, setIsFullscreened] = useState(false);
  const fullscreenNoteHeight = Dimensions.get("window").height;
  const defaultNoteHeight = 300;

  const WrittenNoteThatCanBeFullscreened = () => {
    return (
      <WrittenNoteForm
        initialContent={note.content}
        initialTitle={note.title}
        onChange={(title, content) => note.changeText(title, content)}
        editable={notesAreEditable}
        noteContainerStyle={
          isFullscreened ? styles.fullscreenStyle : { height: defaultNoteHeight }
        }
      />
    );
  };

  return (
    <Lightbox
      onLongPress={onLongPress()}
      underlayColor="white"
      onOpen={() => {
        setIsFullscreened(true);
        setNotesAreEditable(true);
      }}
      willClose={() => {
        setIsFullscreened(false);
        setNotesAreEditable(false);
        notes.edit({ id: note.id, title: note.title, content: note.content });
      }}
      renderContent={() => <WrittenNoteThatCanBeFullscreened />}
    >
      <View
        style={{
          ...(isDraggable
            ? Colors.shadow
            : {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: Colors.borderColor,
              }),
        }}
      >
        <View
          style={{
            height: isFullscreened ? fullscreenNoteHeight : defaultNoteHeight,
            overflow: "hidden",
          }}
        >
          {note instanceof WrittenNote && <WrittenNoteThatCanBeFullscreened />}

          {/* Make a delete button that either deletes a note from a note group
            or deletes a single note and then navigates back to the notes screen */}
          <TouchableOpacity
            style={{ position: "absolute", right: 10, bottom: 14 }}
            onPress={() => {
              if (noteGroupID === null) {
                /* The edit screen is displaying a single note */
                notes.delete(note.id);
                navigation.pop();
              } else {
                /* The edit screen is displaying a note group */
                var newNotesList = ItemArray.remove(notesOnScreen, note.id);
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
  fullscreenStyle: {
    paddingTop: 100,
  },
});

export default DraggableNote;
