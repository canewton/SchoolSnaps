import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../classes/Colors";
import { Transition, Transitioning } from "react-native-reanimated";
import AssignmentListItem from "./AssignmentListItem";
import { Calendar } from "../classes/Calendar";
import { Context as CalendarContext } from "../context/CalendarContext";

const hiddenViewHeight = 300;

const AssignmentsList = ({
  assignments,
  weeksArray,
  monthDataArray,
  weekCalendarFlatListRef,
}) => {
  const navigation = useNavigation();
  const transitionRef = useRef();
  const assignmentFlatlistRef = useRef();
  const specialDates = useContext(CalendarContext);

  const [incompletedAssignments, setIncompletedAssignments] = useState();
  const [completedOrLateAssignments, setCompletedOrLateAssignments] = useState();
  const [pulledFarEnough, setPulledFarEnough] = useState(false);
  const [isSwithchingToAnotherList, setIsSwitchingToAnotherList] = useState(false);
  const [assignmentsDisplayed, setAssignmentsDisplayed] = useState("Incomplete");

  /* Hidden View Functions and Constants */
  const minPullDownDistance = -60;
  const scrollY = useRef(new Animated.Value(0)).current;

  const hiddenViewTranslation = scrollY.interpolate({
    inputRange: [hiddenViewHeight * -1, 0],
    outputRange: [hiddenViewHeight, 0],
    extrapolate: "clamp",
  });

  const handleScroll = (pullDownDistance, isSwithchingToAnotherList) => {
    if (!isSwithchingToAnotherList) {
      if (pullDownDistance.value <= minPullDownDistance) {
        setPulledFarEnough(true);
      } else if (pullDownDistance.value > minPullDownDistance) {
        setPulledFarEnough(false);
      }
    } else if (pullDownDistance.value >= -5) {
      setIsSwitchingToAnotherList(false);
    }
  };

  const handleRelease = useCallback(() => {
    if (pulledFarEnough && !isSwithchingToAnotherList) {
      setIsSwitchingToAnotherList(true);
      setAssignmentsDisplayed(
        assignmentsDisplayed === "Incomplete" ? "Complete" : "Incomplete"
      );
    }
  });

  useEffect(() => {
    scrollY.addListener((value) => handleScroll(value, isSwithchingToAnotherList));
  }, [isSwithchingToAnotherList]);

  /* Change the date selected on the week calendar as the user scrolls through assignments */
  const onViewRef = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const firstViewableItemDate = new Date(viewableItems[0].item[0].date);
      const firstViewableItemDayData = Calendar.getDayDataFromDate(
        firstViewableItemDate,
        weeksArray,
        monthDataArray
      );
      specialDates.edit({
        id: "Selected Date",
        dateObject: firstViewableItemDayData,
      });
      weekCalendarFlatListRef.current.scrollToIndex({
        index: firstViewableItemDayData.weekIndex,
      });
    }
  });

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

  /* Filter assignments based on their lateness and completeness */
  const getIncompletedAssignments = (assignmentsInput) => {
    return assignmentsInput.filter((assignment) => {
      return !isAssignmentLate(assignment.date) && assignment.completed === false;
    });
  };

  const getCompletedOrLateAssignments = (assignmentsInput) => {
    return assignmentsInput.filter((assignment) => {
      return isAssignmentLate(assignment.date) || assignment.completed === true;
    });
  };

  const isAssignmentLate = (assignmentDateString) => {
    const today = new Date();
    return (
      new Date(assignmentDateString).getTime() <
      new Date(
        today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear()
      ).getTime()
    );
  };

  const refreshAssignmentLists = () => {
    setIncompletedAssignments(
      groupAssignmentsByDate(
        sortAssignmentsByDate(getIncompletedAssignments(assignments), true)
      )
    );
    setCompletedOrLateAssignments(
      groupAssignmentsByDate(
        sortAssignmentsByDate(getCompletedOrLateAssignments(assignments), false)
      )
    );
  };

  useEffect(() => {
    refreshAssignmentLists();
  }, [assignments.length]);

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
        {assignmentsDisplayed === "Incomplete" &&
          !pulledFarEnough &&
          !isSwithchingToAnotherList && (
            <Text style={styles.hiddenTextPull}>
              Pull to view completed and late assignments
            </Text>
          )}
        {assignmentsDisplayed === "Incomplete" &&
          (pulledFarEnough || isSwithchingToAnotherList) && (
            <Text style={styles.hiddenTextRelease}>
              Release to view completed and late assignments
            </Text>
          )}
        {assignmentsDisplayed === "Complete" &&
          !pulledFarEnough &&
          !isSwithchingToAnotherList && (
            <Text style={styles.hiddenTextPull}>Pull to view current assignments</Text>
          )}
        {assignmentsDisplayed === "Complete" &&
          (pulledFarEnough || isSwithchingToAnotherList) && (
            <Text style={styles.hiddenTextRelease}>
              Release to view current assignments
            </Text>
          )}
      </Animated.View>

      {/* List of Assignments */}
      <Animated.FlatList
        data={
          assignmentsDisplayed === "Incomplete"
            ? incompletedAssignments
            : completedOrLateAssignments
        }
        keyExtractor={(index) => index[0].date}
        ref={assignmentFlatlistRef}
        extraData={assignmentsDisplayed}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={{ height: 560 }} />}
        onResponderRelease={handleRelease}
        onViewableItemsChanged={onViewRef.current}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        renderItem={({ item, index }) => {
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
                      if (!isAssignmentLate(listItemData.date)) {
                        fadeAnimation.start(() => {
                          transitionRef.current.animateNextTransition();
                          refreshAssignmentLists();
                        });
                      }
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
    paddingBottom: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#b1a7a6",
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 5,
  },
  hiddenTextPull: { fontSize: 14, fontWeight: "600", color: Colors.primaryColor },
  hiddenTextRelease: { fontSize: 14, fontWeight: "800", color: Colors.primaryColor },
});

export default AssignmentsList;
