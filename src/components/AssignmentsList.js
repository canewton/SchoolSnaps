import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";
import AssignmentListItem from "./AssignmentListItem";
import { Calendar } from "../classes/Calendar";

const hiddenViewHeight = 300;

const AssignmentsList = ({
  assignments,
  assignmentStats,
  onPressCheckmark,
  descending,
}) => {
  const transitionRef = useRef();
  const assignmentFlatlistRef = useRef();
  const screenWidth = Dimensions.get("window").width;

  const scrollY = useRef(new Animated.Value(0)).current;
  const [assignmentsList, setAssignmentsList] = useState([]);

  const hiddenViewTranslation = scrollY.interpolate({
    inputRange: [hiddenViewHeight * -1, 0],
    outputRange: [hiddenViewHeight, 0],
    extrapolate: "clamp",
  });

  const refreshAssignmentList = (assignmentsInput) => {
    setAssignmentsList(
      groupAssignmentsByDate(sortAssignmentsByDate(assignmentsInput, descending))
    );
  };

  useEffect(() => {
    refreshAssignmentList(assignments);
  }, [assignments.length]);

  /* Filter the assignments array by its completeness and sort it by date */
  const filterAssignmentsByDate = (assignmentsInput, date) => {
    return assignmentsInput.filter((assignment) => assignment.date === date);
  };

  const groupAssignmentsByDate = (assignmentsInput) => {
    const remainingAssignments = [...assignmentsInput];
    const newAssignmentsArray = [];
    while (remainingAssignments.length > 0) {
      newAssignmentsArray.push(
        filterAssignmentsByDate(assignmentsInput, remainingAssignments[0].date)
      );
      remainingAssignments.splice(
        0,
        newAssignmentsArray[newAssignmentsArray.length - 1].length
      );
    }
    return newAssignmentsArray;
  };

  const sortAssignmentsByDate = (assignmentsInput, isDescending) => {
    const booleanExpression = (a, b) => {
      if (isDescending === true) {
        return new Date(a.date) - new Date(b.date);
      }
      return new Date(b.date) - new Date(a.date);
    };
    return assignmentsInput.sort((a, b) => booleanExpression(a, b));
  };

  /* Define the animation that happens when an assignment is deleted */
  const transition = <Transition.Change interpolation="easeInOut" durationMs={400} />;

  return (
    <Transitioning.View style={{ flex: 1 }} transition={transition} ref={transitionRef}>
      {/* Hidden View */}
      <Animated.View
        style={{
          ...styles.hiddenViewContainer,
          transform: [{ translateY: hiddenViewTranslation }],
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: screenWidth,
          }}
        >
          <View style={styles.hiddenTextContainer}>
            <Text style={{ ...styles.hiddenTextCounter, color: "orange" }}>
              {assignmentStats.current}
            </Text>
            <Text style={{ ...styles.hiddenText, color: "orange" }}>Current</Text>
          </View>
          <View style={styles.hiddenTextContainer}>
            <Text style={{ ...styles.hiddenTextCounter, color: "red" }}>
              {assignmentStats.late}
            </Text>
            <Text style={{ ...styles.hiddenText, color: "red" }}>Late</Text>
          </View>
          <View style={styles.hiddenTextContainer}>
            <Text style={{ ...styles.hiddenTextCounter, color: "green" }}>
              {assignmentStats.completed}
            </Text>
            <Text style={{ ...styles.hiddenText, color: "green" }}>Completed</Text>
          </View>
        </View>
      </Animated.View>

      {/* List of Assignments */}
      <Animated.FlatList
        data={assignmentsList}
        keyExtractor={(index) => index[0].date}
        ref={assignmentFlatlistRef}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={{ height: 560 }} />}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        renderItem={({ item }) => {
          const itemDate = new Date(item[0].date);
          return (
            <View>
              <Text style={styles.dateText}>
                {itemDate.getDate() === new Date().getDate() &&
                itemDate.getMonth() === new Date().getMonth() &&
                itemDate.getFullYear() === new Date().getFullYear()
                  ? "Today"
                  : Calendar.monthNames[itemDate.getMonth()] +
                    " " +
                    itemDate.getDate() +
                    ", " +
                    itemDate.getFullYear()}
              </Text>
              {item.map((listItemData, listItemIndex) => {
                return (
                  <AssignmentListItem
                    key={listItemData.id}
                    item={listItemData}
                    index={listItemIndex}
                    onPressCheckmark={(fadeAnimation) => {
                      fadeAnimation.start(() => {
                        transitionRef.current.animateNextTransition();
                        onPressCheckmark();
                      });
                    }}
                  />
                );
              })}
            </View>
          );
        }}
      />
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  hiddenViewContainer: {
    position: "absolute",
    top: hiddenViewHeight * -1,
    left: 0,
    right: 0,
    height: hiddenViewHeight,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 15,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#b1a7a6",
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 5,
  },
  hiddenText: {
    fontSize: 10,
    fontWeight: "500",
    color: "black",
    marginTop: 2,
  },
  hiddenTextCounter: {
    fontSize: 34,
    fontWeight: "600",
  },
  hiddenTextContainer: { borderRadius: 10, alignItems: "center", width: 100 },
});

export default AssignmentsList;
