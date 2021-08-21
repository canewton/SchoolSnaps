import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../classes/Colors";

const FormBottomSheetHeader = ({ title, onSaveCallback }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        marginBottom: 20,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: Colors.primaryColor,
          fontWeight: "bold",
          fontSize: 22,
          marginLeft: 25,
        }}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={() => onSaveCallback()}>
        <View
          style={{
            height: 23,
            justifyContent: "center",
            paddingHorizontal: 8,
            backgroundColor: Colors.primaryColor,
            marginRight: 25,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 11,
              fontWeight: "600",
              letterSpacing: 0.2,
            }}
          >
            Save
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FormBottomSheetHeader;
