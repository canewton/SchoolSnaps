import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import WrittenNoteForm from "../components/WrittenNoteForm";
import { Context as NotesContext } from "../context/NotesContext";
import { GeneralIcons } from "../icons/GeneralIcons";

const NotesEditScreen = ({ route }) => {
  const navigation = useNavigation();
  const notes = useContext(NotesContext);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.cameraButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.pop()} style={styles.button}>
          {GeneralIcons.findIcon("Close", 28, "white")}
        </TouchableOpacity>
      </View>
      <FlatList
        data={route.params.notes}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => {
          return (
            <View>
              <WrittenNoteForm
                initialValues={item}
                onChange={(title, content) => {
                  notes.edit({ id: item.id, title, content });
                }}
              />
            </View>
          );
        }}
      />
    </View>
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
