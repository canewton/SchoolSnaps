import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ClassIcons } from "../icons/ClassIcons";
import { Colors } from "../classes/Colors";
import { Context as ClassesContext } from "../context/ClassesContext";
import HorizontalScrollPicker from "./HorizontalScrollPicker";
import { AssignmentTypeIcons } from "../icons/AssignmentTypeIcons";
import AccordionListItem from "./AccordianListItem";

const AssignmentForm = ({ onEdit, initialValues }) => {
  const classes = useContext(ClassesContext);

  //set default values
  const [title, setTitle] = useState("");
  const [schoolClass, setSchoolClass] = useState(classes.state[0]);
  const [iconName, setIconName] = useState(
    AssignmentTypeIcons.iconList(30, "white")[0].name
  );
  const [attachedNotes, setAttachedNotes] = useState([]);
  const [classIsOpen, setClassIsOpen] = useState(true);
  const [typeIsOpen, setTypeIsOpen] = useState(true);

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
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <TextInput
          style={[styles.input, { borderColor: schoolClass.primaryColor }]}
          value={title}
          placeholder="Custom Title (Optional)"
          onChangeText={(text) => setTitle(text)}
        />
        <AccordionListItem
          title="Class:  "
          pickedItem={schoolClass.name}
          open={classIsOpen}
          setOpen={(boolean) => setClassIsOpen(boolean)}
        >
          <HorizontalScrollPicker
            optionsToPick={classes.state}
            onPressCallback={(pickedItem) => {
              setClassIsOpen(false);
              setSchoolClass(pickedItem);
            }}
            currentPick={schoolClass.id}
          />
        </AccordionListItem>
        <AccordionListItem
          title="Type:  "
          pickedItem={iconName}
          open={typeIsOpen}
          setOpen={(boolean) => setTypeIsOpen(boolean)}
        >
          <HorizontalScrollPicker
            optionsToPick={AssignmentTypeIcons.iconList(30, "black")}
            onPressCallback={(pickedItem) => {
              setIconName(pickedItem.name);
              setTypeIsOpen(false);
            }}
            currentPick={iconName}
            backgroundColor={schoolClass.primaryColor}
          />
        </AccordionListItem>
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
});

export default AssignmentForm;
