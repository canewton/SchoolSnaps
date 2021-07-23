import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";
import FloatingActionButton from "../components/FloatingActionButton";
import { GeneralIcons } from "../icons/GeneralIcons";
import NotesList from "../components/NotesList";
import { Context as NotesContext } from "../context/NotesContext";
import RBSheet from "react-native-raw-bottom-sheet";

const bottomSheetHeight = 230;

const NotesScreen = ({ route }) => {
  const navigation = useNavigation();
  const notes = useContext(NotesContext);
  const sheetRef = React.useRef();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton color={route.params.primaryColor} />,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            sheetRef.current.open();
          }}
          style={{ paddingRight: 15 }}
        >
          {GeneralIcons.findIcon("Edit", 24, route.params.primaryColor)}
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={{ flex: 1 }}>
      <NotesList notesFilteredByDate={notes.state} />
      <FloatingActionButton schoolClass={route.params} navigation={navigation} />
      <RBSheet ref={sheetRef} closeOnDragDown={false} height={290} openDuration={250}>
        <BottomSheetContent
          navigation={navigation}
          schoolClass={route.params}
          onPressButton={() => {
            sheetRef.current.close();
          }}
        />
      </RBSheet>
    </View>
  );
};

const BottomSheetContent = ({ navigation, schoolClass, onPressButton }) => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <TouchableOpacity>
        <Text style={styles.bottomSheetText}>Select notes</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.bottomSheetText}>Filter notes</Text>
      </TouchableOpacity>
      <View style={styles.border} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Edit Note", schoolClass);
          onPressButton();
        }}
        style={styles.button}
      >
        <Text style={styles.bottomSheetText}>Edit class</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.bottomSheetText}>Archive class</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.bottomSheetText}>Delete class</Text>
      </TouchableOpacity>
    </View>
  );
};

const IconNextToText = (title, iconName) => {
  <View style={{ alignItems: "center" }}>
    <View style={{ flexDirection: "row", alignItems: "center", padding: 3 }}>
      {GeneralIcons.findIcon(iconName, 16, "black")}
      <Text style={{ marginLeft: 5, fontSize: 14 }}>{title}</Text>
    </View>
  </View>;
};

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 3.5,
    borderBottomColor: "#dee2e6",
  },
  bottomSheetText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#343a40",
    margin: 15,
    alignItems: "flex-start",
  },
});

export default NotesScreen;
