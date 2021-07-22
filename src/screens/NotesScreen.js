import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";
import {
  FloatingActionButton,
  FloatingButtonStyles,
} from "../components/FloatingActionButton";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { GeneralIcons } from "../icons/GeneralIcons";
import NotesList from "../components/NotesList";
import { Context as NotesContext } from "../context/NotesContext";
import { WrittenNote } from "../classes/WrittenNote";

const NotesScreen = ({ route }) => {
  const navigation = useNavigation();
  const notes = useContext(NotesContext);
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
      <View style={FloatingButtonStyles.buttonContainer}>
        <View style={FloatingButtonStyles.buttonPosition}>
          <Menu
            style={{}}
            renderer={renderers.Popover}
            rendererProps={{ anchorStyle: styles.anchorStyle, placement: "top" }}
          >
            <MenuTrigger
              children={<FloatingActionButton color={route.params.primaryColor} />}
              customStyles={triggerStyles}
            />
            <MenuOptions customStyles={optionStyles}>
              <MenuOption
                text="Photo"
                onSelect={() => navigation.navigate("Camera", route.params)}
              />
              <MenuOption
                text="Note"
                onSelect={() => {
                  var note = new WrittenNote(route.params, "", "");
                  notes.add(note);
                  navigation.navigate("Edit Note", note);
                }}
              />
              <MenuOption text="Task" />
            </MenuOptions>
          </Menu>
        </View>
      </View>
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
  anchorStyle: {
    backgroundColor: "white",
    opacity: 0,
  },
});

const optionStyles = {
  optionTouchable: {
    underlayColor: "transparent",
    activeOpacity: 0.7,
  },
  optionWrapper: {
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    margin: 3,
  },
  optionText: {
    color: "black",
    alignSelf: "center",
    fontSize: 14,
    margin: 6,
  },
  optionsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 200,
    padding: 3,
  },
};

const triggerStyles = {
  triggerTouchable: {
    underlayColor: "transparent",
    activeOpacity: 0.5,
  },
};

export default NotesScreen;
