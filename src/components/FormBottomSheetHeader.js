import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../classes/Colors";

const FormBottomSheetHeader = ({ title }) => {
  return (
    <View>
      <Text
        style={{
          marginTop: 30,
          marginBottom: 20,
          color: Colors.primaryColor,
          fontWeight: "bold",
          fontSize: 22,
          marginLeft: 25,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FormBottomSheetHeader;
