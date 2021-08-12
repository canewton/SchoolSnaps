import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import AssignmentForm from "../components/AssignmentForm";
import { Context as ClassesContext } from "../context/ClassesContext";

const AssignmentAddScreen = ({ navigation, route }) => {
  const classes = useContext(ClassesContext);
  return (
    <View style={{ flex: 1 }}>
      <AssignmentForm
        initialValues={null}
        calendarData={{
          weeksArray: route.params.weeksArray,
          monthDataArray: route.params.monthDataArray,
        }}
        /* onSubmit={(schoolClass) => {
          classes.add(schoolClass);
          navigation.pop();
        }} */
      />
    </View>
  );
};

export default AssignmentAddScreen;
