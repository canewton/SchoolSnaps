import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ItemArray } from "../classes/ItemArray";
import { Context as NotesContext } from "../context/NotesContext";
import NotesList from "../components/NotesList";
import { useNavigation } from "@react-navigation/native";
import HeaderButton from "../components/HeaderButton";

const AttachNotesScreen = ({ route }) => {
  const navigation = useNavigation();
  const notes = useContext(NotesContext);
  const notesFilteredByClass = ItemArray.filter(notes.state, "schoolClass", route.params);

  //add a save and cancel button on either side of the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton name="Add" onPressCallback={() => navigation.pop()} />
      ),
      headerLeft: () => (
        <HeaderButton name="Cancel" onPressCallback={() => navigation.pop()} />
      ),
    });
  });

  return (
    <View style={{ flex: 1 }}>
      <NotesList
        notesFilteredByDate={notesFilteredByClass}
        mode="select"
        imagesPerRow={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AttachNotesScreen;
