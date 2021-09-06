import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { GeneralIcons } from "../icons/GeneralIcons";

const HeaderIconButton = ({ style, iconName, callback, color, size }) => {
  return (
    <View style={{ ...style, marginHorizontal: 10 }}>
      <TouchableOpacity onPress={() => callback()}>
        {GeneralIcons.findIcon(iconName, size === undefined ? 26 : size, color)}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HeaderIconButton;
