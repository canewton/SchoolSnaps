import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../classes/Colors";

//make a button that goes to the right of the header that adds a class
const AddButton = ({ onPressCallback }) => {
  return (
    <TouchableOpacity onPress={() => onPressCallback()}>
      <View
        style={{
          marginRight: 25,
          backgroundColor: Colors.primaryColor,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          height: 23,
          width: 23,
        }}
      >
        <Entypo name="plus" size={22} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default AddButton;
