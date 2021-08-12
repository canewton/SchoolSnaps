import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import AssignmentForm from "../components/AssignmentForm";
import { Context as AssignmentsContext } from "../context/AssignmentsContext";

const AssignmentAddScreen = ({ navigation, route }) => {
  const assignments = useContext(AssignmentsContext);
  return (
    <View style={{ flex: 1 }}>
      <AssignmentForm
        initialValues={null}
        calendarData={{
          weeksArray: route.params.weeksArray,
          monthDataArray: route.params.monthDataArray,
        }}
        onSubmit={(assignment) => {
          assignments.add(assignment);
          navigation.pop();
        }}
      />
    </View>
  );
};

export default AssignmentAddScreen;
