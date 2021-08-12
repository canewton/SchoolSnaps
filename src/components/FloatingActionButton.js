import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GeneralIcons } from "../icons/GeneralIcons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { Colors } from "../classes/Colors";

const buttonHeight = 56;
const buttonBorderRadius = buttonHeight / 2;
const buttonWidth = 220;

const FloatingActionButton = ({
  schoolClass,
  onPressPhoto,
  onPressNote,
  onPressTask,
}) => {
  const Button = ({ color }) => {
    return (
      <View
        style={{
          height: buttonHeight,
          width: buttonWidth,
          borderRadius: buttonBorderRadius,
          backgroundColor: "white",
          alignItems: "center",
          ...Colors.shadow,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 15 }}
          onPress={() => onPressPhoto()}
        >
          {GeneralIcons.findIcon("Plus", 28, color)}
          <Text style={{ fontSize: 18, color: color, marginHorizontal: 5 }}>
            New Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingLeft: 12,
            backgroundColor: "#fafafa",
            width: "25%",
            height: buttonHeight,
            justifyContent: "center",
            borderTopRightRadius: buttonBorderRadius,
            borderBottomRightRadius: buttonBorderRadius,
          }}
          onPress={() => onPressNote()}
        >
          {GeneralIcons.findIcon("Add Note", 28, color)}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.buttonPosition}>
        <Button color={schoolClass.primaryColor} />
      </View>
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
  buttonContainer: { width: buttonWidth, alignSelf: "center" },
  buttonPosition: { position: "absolute", bottom: 80 },
  anchorStyle: {
    backgroundColor: "white",
    opacity: 0,
  },
});

export default FloatingActionButton;
