import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { GeneralIcons } from "../icons/GeneralIcons";

const HeaderIconButton = ({ style, iconName, callback, color }) => {
  return (
    <View style={{ ...style, marginHorizontal: 10 }}>
      <TouchableOpacity onPress={() => callback()}>
        {GeneralIcons.findIcon(iconName, 24, color)}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HeaderIconButton;
