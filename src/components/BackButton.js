import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { GeneralIcons } from "../icons/GeneralIcons";
import { Colors } from "../classes/Colors";
import { useNavigation } from "@react-navigation/core";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginLeft: 10 }}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        {GeneralIcons.findIcon("Back", 24, Colors.primaryColor)}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BackButton;
