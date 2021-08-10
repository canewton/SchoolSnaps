import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../classes/Colors";

const HeaderButton = ({ name, onPressCallback }) => {
  return (
    <TouchableOpacity onPress={() => onPressCallback()}>
      <View style={{ marginHorizontal: 15 }}>
        <Text style={{ color: Colors.primaryColor, fontSize: 18, fontWeight: "400" }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default HeaderButton;
