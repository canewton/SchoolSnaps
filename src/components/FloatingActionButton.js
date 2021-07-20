import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GeneralIcons } from "../icons/GeneralIcons";

const FloatingActionButton = ({ color }) => {
  const circleDiameter = 60;
  const circleRadius = circleDiameter / 2;
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ width: circleDiameter, flex: 1 }}>
        <View
          style={{
            height: circleDiameter,
            width: circleDiameter,
            borderRadius: circleRadius,
            backgroundColor: "white",
            position: "absolute",
            bottom: 80,
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FloatingActionButton;
