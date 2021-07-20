import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GeneralIcons } from "../icons/GeneralIcons";

const circleDiameter = 60;
const circleRadius = circleDiameter / 2;

const FloatingActionButton = ({ color }) => {
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

const FloatingButtonStyles = StyleSheet.create({
  buttonContainer: { width: circleDiameter, flex: 1, alignSelf: "center" },
  buttonPosition: { position: "absolute", bottom: 80 },
});

export { FloatingActionButton, FloatingButtonStyles };
