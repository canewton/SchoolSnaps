import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ClassIcons } from "../icons/ClassIcons";
import { Colors } from "../classes/Colors";
import { Context as ClassesContext } from "../context/ClassesContext";
import HorizontalScrollPicker from "./HorizontalScrollPicker";
import { AssignmentTypeIcons } from "../icons/AssignmentTypeIcons";

const AssignmentForm = ({ onEdit, initialValues }) => {
  const classes = useContext(ClassesContext);

  //set default values
  const [title, setTitle] = useState("");
  const [schoolClass, setSchoolClass] = useState(classes.state[0]);
  const [iconName, setIconName] = useState(ClassIcons.iconList(30, "white")[0].name);
  const [attachedNotes, setAttachedNotes] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    if (initialValues !== null) {
      setTitle(initialValues.title);
      setSchoolClass(initialValues.schoolClass);
      setIconName(initialValues.iconName);
      setAttachedNotes(initialValues.attachedNotes);
    }
  }, []);

  return (
    <View>
      <ScrollView>
        <TextInput
          style={[styles.input, { borderColor: schoolClass.primaryColor }]}
          value={title}
          placeholder="Custom Title (Optional)"
          onChangeText={(text) => setTitle(text)}
        />
        <Text style={styles.subtitle}>Choose Class:</Text>
        <HorizontalScrollPicker
          optionsToPick={classes.state}
          onPressCallback={(pickedItem) => setSchoolClass(pickedItem)}
          currentPick={schoolClass.id}
        />
        <Text style={styles.subtitle}>Choose Type:</Text>
        <HorizontalScrollPicker
          optionsToPick={AssignmentTypeIcons.iconList(30, "black")}
          onPressCallback={(pickedItem) => setIconName(pickedItem.name)}
          currentPick={iconName}
          backgroundColor={schoolClass.primaryColor}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    fontSize: 25,
    marginBottom: 15,
    borderBottomWidth: 3,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "300",
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 10,
  },
  classCircle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 3,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  classLabel: {
    marginTop: 5,
    marginHorizontal: 6,
    fontSize: 10,
    alignSelf: "center",
    fontWeight: "300",
    textAlign: "center",
  },
  calendarButton: {
    height: 40,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  choiceContainer: {
    width: 100,
    height: 120,
    backgroundColor: "white",
    alignItems: "center",
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
});

export default AssignmentForm;
