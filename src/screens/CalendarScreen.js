import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../components/AddButton";
import { Colors } from "../classes/Colors";
import AssignmentsList from "../components/AssignmentsList";
import { Context as AssignmentContext } from "../context/AssignmentsContext";
import BottomSheet from "../components/BottomSheet";
import AssignmentForm from "../components/AssignmentForm";
import Styles from "../classes/Styles";
import TopTabs from "../components/TopTabs";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Current");
  const assignments = useContext(AssignmentContext);
  const tabButtons = [{ name: "Current" }, { name: "Late" }, { name: "Completed" }];
  const bottomSheet = useRef();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ height: Styles.assignmentsHeaderHeight }}>
          <View style={Styles.header.container}>
            <Text style={Styles.header.text}>Assignments</Text>
            <AddButton onPressCallback={() => bottomSheet.current.open()} />
          </View>
          <View style={{ marginBottom: 12.5 }} />
          <View
            style={{
              marginHorizontal: 25,
              borderRadius: 10,
              backgroundColor: Colors.changeOpacity("#ffffff", 0.25),
              flexDirection: "row",
            }}
          >
            <TopTabs
              tabButtons={tabButtons}
              callback={(tabName) => setActiveTab(tabName)}
            />
          </View>
        </View>
      ),
    });
  });

  //console.log(bottomSheet);

  /* Filter assignments based on their lateness and completeness */
  const getCurrentAssignments = (assignmentsInput) => {
    return assignmentsInput.filter((assignment) => {
      return !isAssignmentLate(assignment.date) && assignment.completed === false;
    });
  };

  const getCompletedAssignments = (assignmentsInput) => {
    return assignmentsInput.filter((assignment) => {
      return assignment.completed === true;
    });
  };

  const getLateAssignments = (assignmentsInput) => {
    return assignmentsInput.filter((assignment) => {
      return isAssignmentLate(assignment.date) && assignment.completed === false;
    });
  };

  const isAssignmentLate = (assignmentDateString) => {
    return (
      new Date(assignmentDateString).getTime() <
      new Date(new Date().toLocaleDateString()).getTime()
    );
  };

  const currentAssignments = getCurrentAssignments(assignments.state);
  const lateAssignments = getLateAssignments(assignments.state);
  const completedAssignments = getCompletedAssignments(assignments.state);

  const [assignmentStats, setAssignmentStats] = useState({});

  const refreshAssignmentStats = () => {
    setAssignmentStats({
      current: currentAssignments.length,
      late: lateAssignments.length,
      completed: completedAssignments.length,
    });
  };

  useEffect(() => {
    refreshAssignmentStats();
  }, [currentAssignments.length, lateAssignments.length, completedAssignments.length]);

  return (
    <View style={{ flex: 1 }}>
      {activeTab === "Current" && (
        <AssignmentsList
          assignments={currentAssignments}
          assignmentStats={assignmentStats}
          onPressCheckmark={() => refreshAssignmentStats()}
          descending={true}
        />
      )}
      {activeTab === "Late" && (
        <AssignmentsList
          assignments={lateAssignments}
          assignmentStats={assignmentStats}
          onPressCheckmark={() => refreshAssignmentStats()}
          descending={false}
        />
      )}
      {activeTab === "Completed" && (
        <AssignmentsList
          assignments={completedAssignments}
          assignmentStats={assignmentStats}
          onPressCheckmark={() => refreshAssignmentStats()}
          descending={false}
        />
      )}

      <BottomSheet ref={bottomSheet}>
        <AssignmentForm
          initialValues={null}
          onSubmit={(assignmentSubmitted) => {
            assignments.add(assignmentSubmitted);
            bottomSheet.current.close();
          }}
          headerTitle="New Assignment"
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarScreen;
