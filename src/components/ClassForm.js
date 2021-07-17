import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../classes/Colors";
import { ClassIcons } from "../icons/ClassIcons";

const ClassForm = ({ onEdit, initialValues }) => {
  //set default values
  const [name, setName] = useState("");
  const [primaryColor, setPrimaryColor] = useState(Colors.classColors.primaryColor);
  const [iconName, setIconName] = useState(ClassIcons.iconList(30, "white")[0]);

  useEffect(() => {
    if (initialValues !== null) {
      setName(initialValues.name);
      setPrimaryColor(initialValues.primaryColor);
      setIconName(initialValues.iconName);
    }
  });

  return (
    <View>
      <Text>List Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ClassForm;
