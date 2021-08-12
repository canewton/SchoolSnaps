import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import AssignmentForm from "../components/AssignmentForm";
import { Context as AssignmentsContext } from "../context/AssignmentsContext";

const AssignmentEditScreen = ({ navigation, route }) => {
  const assignments = useContext(AssignmentsContext);
  const assignment = route.params.assignment;
  return (
    <View style={{ flex: 1 }}>
      <AssignmentForm
        initialValues={assignment}
        calendarData={{
          weeksArray: route.params.weeksArray,
          monthDataArray: route.params.monthDataArray,
        }}
        onSubmit={(assignmentSubmitted) => {
          assignments.edit(assignmentSubmitted);
          navigation.pop();
        }}
      />
    </View>
  );
};

export default AssignmentEditScreen;
