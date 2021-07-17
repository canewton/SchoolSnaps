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
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../classes/Colors";
import { ClassIcons } from "../icons/ClassIcons";
import { SchoolClass } from "../classes/SchoolClass";
import { ItemArray } from "../classes/ItemArray";

const ClassForm = ({ onSubmit, initialValues }) => {
  //set default values
  const [id, setId] = useState(ItemArray.generateUniqueID());
  const [name, setName] = useState("History");
  const [primaryColor, setPrimaryColor] = useState(Colors.classColors[0].primaryColor);
  const [iconName, setIconName] = useState(ClassIcons.iconList(30, "white")[0].name);

  const navigation = useNavigation();

  useEffect(() => {
    if (initialValues !== null) {
      setId(initialValues.id);
      setName(initialValues.name);
      setPrimaryColor(initialValues.primaryColor);
      setIconName(initialValues.iconName);
    }
  });

  //add a save button to the right of the header that adds a class to the context
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onSubmit(new SchoolClass(id, name, primaryColor, iconName))}
        >
          <SaveClassButton />
        </TouchableOpacity>
      ),
    });
  });

  //make a button that goes to the right of the header that saves the class being editted or added
  const SaveClassButton = () => {
    return (
      <View style={{ marginRight: 15 }}>
        <Text style={{ color: Colors.primaryColor, fontSize: 18, fontWeight: "400" }}>
          Save
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Text>List Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ClassForm;
