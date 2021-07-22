import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import WrittenNoteForm from "../components/WrittenNoteForm";
import { Context as NotesContext } from "../context/NotesContext";

const NotesEditScreen = ({ navigation, route }) => {
  const notes = useContext(NotesContext);
  return (
    <View>
      <WrittenNoteForm
        initialValues={route.params}
        onSubmit={(title, content) => {
          notes.edit({ id: route.params.id, title, content });
          navigation.pop();
        }}
      />
    </View>
  );
};

export default NotesEditScreen;
