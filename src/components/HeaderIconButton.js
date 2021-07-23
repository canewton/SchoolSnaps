import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { GeneralIcons } from "../icons/GeneralIcons";
import { Colors } from "../classes/Colors";
import { useNavigation } from "@react-navigation/core";

const HeaderIconButton = ({ style, iconName, callback, color }) => {
  const navigation = useNavigation();
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
