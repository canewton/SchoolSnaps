import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";
import FloatingActionButton from "../components/FloatingActionButton";
import { GeneralIcons } from "../icons/GeneralIcons";
import NotesList from "../components/NotesList";
import { Context as NotesContext } from "../context/NotesContext";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

const NotesScreen = ({ route }) => {
  const navigation = useNavigation();
  const notes = useContext(NotesContext);
  const sheetRef = React.useRef(null);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton color={route.params.primaryColor} />,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Edit Class", route.params)}
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

const styles = StyleSheet.create({});

export default NotesScreen;
