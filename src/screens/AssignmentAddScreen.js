import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import AssignmentForm from "../components/AssignmentForm";
import { Context as ClassesContext } from "../context/ClassesContext";

const AssignmentAddScreen = ({ navigation }) => {
  const classes = useContext(ClassesContext);
  return (
    <View>
      <AssignmentForm
        initialValues={null}
        /* onSubmit={(schoolClass) => {
          classes.add(schoolClass);
          navigation.pop();
        }} */
      />
    </View>
  );
};

export default AssignmentAddScreen;
