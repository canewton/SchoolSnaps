import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GeneralIcons } from "../icons/GeneralIcons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { WrittenNote } from "../classes/WrittenNote";
import { Context as NotesContext } from "../context/NotesContext";

const circleDiameter = 60;
const circleRadius = circleDiameter / 2;

const FloatingActionButton = ({ schoolClass, navigation }) => {
  const notes = useContext(NotesContext);

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonPosition}>
        <Menu
          style={{}}
          renderer={renderers.Popover}
          rendererProps={{ anchorStyle: styles.anchorStyle, placement: "top" }}
        >
          <MenuTrigger
            children={<Button color={schoolClass.primaryColor} />}
            customStyles={triggerStyles}
          />
          <MenuOptions customStyles={optionStyles}>
            <MenuOption
              text="Photo"
              onSelect={() => navigation.navigate("Camera", schoolClass)}
            />
            <MenuOption
              text="Note"
              onSelect={() => {
                var note = new WrittenNote(schoolClass, "", "");
                notes.add(note);
                navigation.navigate("Edit Note", { notes: new Array(note) });
              }}
            />
            <MenuOption text="Task" />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

const Button = ({ color }) => {
  return (
    <View
      style={{
        height: circleDiameter,
        width: circleDiameter,
        borderRadius: circleRadius,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {GeneralIcons.findIcon("Plus", 34, color)}
    </View>
  );
};

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

const styles = StyleSheet.create({
  buttonContainer: { width: circleDiameter, alignSelf: "center" },
  buttonPosition: { position: "absolute", bottom: 80 },
  anchorStyle: {
    backgroundColor: "white",
    opacity: 0,
  },
});

export default FloatingActionButton;
