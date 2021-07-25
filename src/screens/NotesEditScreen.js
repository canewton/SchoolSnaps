import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import WrittenNoteForm from "../components/WrittenNoteForm";
import { Context as NotesContext } from "../context/NotesContext";
import { GeneralIcons } from "../icons/GeneralIcons";
import { Keyboard } from "react-native";
import { WrittenNote } from "../classes/WrittenNote";
import FloatingActionButton from "../components/FloatingActionButton";

const NotesEditScreen = ({ route }) => {
  const navigation = useNavigation();
  const notes = useContext(NotesContext);
  console.log(route.params);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.cameraButtonsContainer}>
          <TouchableOpacity onPress={() => navigation.pop()} style={styles.button}>
            {GeneralIcons.findIcon("Close", 28, "white")}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        data={route.params.notes}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => {
          return (
            <View>
              {item instanceof WrittenNote && (
                <WrittenNoteForm
                  initialValues={item}
                  onChange={(title, content) => {
                    notes.edit({ id: item.id, title, content });
                  }}
                />
              )}
            </View>
          );
        }}
      />
      <FloatingActionButton
        schoolClass={route.params.schoolClass}
        onPressPhoto={() => navigation.navigate("Camera", route.params.schoolClass)}
        onPressNote={() => {
          var note = new WrittenNote(route.params, "", "");
          notes.edit({ id: route.params.id, notes: [...route.params.notes, note] });
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
