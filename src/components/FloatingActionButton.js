import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GeneralIcons } from "../icons/GeneralIcons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { Colors } from "../classes/Colors";

const circleDiameter = 60;
const circleRadius = circleDiameter / 2;

const FloatingActionButton = ({
  schoolClass,
  onPressPhoto,
  onPressNote,
  onPressTask,
}) => {
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
            <MenuOption text="Photo" onSelect={() => onPressPhoto()} />
            <MenuOption text="Note" onSelect={() => onPressNote()} />
            <MenuOption text="Task" onSelect={() => onPressTask()} />
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
        ...Colors.shadow,
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
