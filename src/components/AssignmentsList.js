import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../classes/Colors";
import { Transition, Transitioning } from "react-native-reanimated";
import { ItemArray } from "../classes/ItemArray";
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
  const transitionRef = React.useRef();
  const specialDates = useContext(CalendarContext);

  const [incompletedAssignments, setIncompletedAssignments] = useState();
  const [completedAssignments, setCompletedAssignments] = useState();
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

  const sortAssignmentsByDate = (assignmentsInput) => {
    return assignmentsInput.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  useEffect(() => {
    setIncompletedAssignments(
      groupAssignmentsByDate(
        sortAssignmentsByDate(ItemArray.filter(assignments, "completed", false))
      )
    );
    setCompletedAssignments(
      groupAssignmentsByDate(
        sortAssignmentsByDate(ItemArray.filter(assignments, "completed", true))
      )
    );
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
        {!pulledFarEnough && !isSwithchingToAnotherList && (
          <Text style={{ fontSize: 14, fontWeight: "600", color: Colors.primaryColor }}>
            Pull to view completed and late assignments
          </Text>
        )}
        {(pulledFarEnough || isSwithchingToAnotherList) && (
          <Text style={{ fontSize: 14, fontWeight: "800", color: Colors.primaryColor }}>
            Release to view completed and late assignments
          </Text>
        )}
      </Animated.View>

      {/* List of Assignments */}
      <Animated.FlatList
        data={
          assignmentsDisplayed === "Incomplete"
            ? incompletedAssignments
            : completedAssignments
        }
        keyExtractor={(index) => index[0].date}
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
                {Calendar.monthNames[itemDate.getMonth()] +
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
                    onPressCheckmark={() => {
                      transitionRef.current.animateNextTransition();
                      const newIncompletedAssignmentsArray = [...incompletedAssignments];
                      newIncompletedAssignmentsArray[index].splice(listItemIndex, 1);
                      if (newIncompletedAssignmentsArray[index].length === 0) {
                        newIncompletedAssignmentsArray.splice(index, 1);
                      }
                      setIncompletedAssignments(newIncompletedAssignmentsArray);
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
});

export default AssignmentsList;
