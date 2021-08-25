import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ItemArray } from "../classes/ItemArray";
import { Context as NotesContext } from "../context/NotesContext";
import NotesList from "./NotesList";
import { Colors } from "../classes/Colors";

const AttachNotesForm = ({ schoolClass }) => {
  const notes = useContext(NotesContext);
  const notesFilteredByClass = ItemArray.filter(notes.state, "schoolClass", schoolClass);

  return (
    <View>
      <Text
        style={{
          color: schoolClass.primaryColor,
          fontWeight: "bold",
          fontSize: 22,
          marginLeft: 25,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        {schoolClass.name + " Notes"}
      </Text>
      <NotesList
        notesFilteredByDate={notesFilteredByClass}
        mode="select"
        imagesPerRow={4}
        scrollable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AttachNotesForm;
