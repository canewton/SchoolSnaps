import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GeneralIcons } from "../icons/GeneralIcons";
import { Colors } from "../classes/Colors";

const buttonHeight = 56;
const buttonBorderRadius = buttonHeight / 2;
const buttonWidth = 220;

const FloatingActionButton = ({ schoolClass, onPressPhoto, onPressNote }) => {
  const Button = ({ color }) => {
    return (
      <View
        style={{
          height: buttonHeight,
          width: buttonWidth,
          borderRadius: buttonBorderRadius,
          backgroundColor: color,
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
          {GeneralIcons.findIcon("Plus", 28, "white")}
          <Text style={{ fontSize: 18, color: "white", marginHorizontal: 5 }}>
            New Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingLeft: 12,
            backgroundColor: Colors.changeOpacity("#000000", 0.1),
            width: "25%",
            height: buttonHeight,
            justifyContent: "center",
            borderTopRightRadius: buttonBorderRadius,
            borderBottomRightRadius: buttonBorderRadius,
          }}
          onPress={() => onPressNote()}
        >
          {GeneralIcons.findIcon("Add Note", 28, "white")}
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

const styles = StyleSheet.create({
  buttonContainer: { width: buttonWidth, alignSelf: "center" },
  buttonPosition: { position: "absolute", bottom: 80 },
});

export default FloatingActionButton;
