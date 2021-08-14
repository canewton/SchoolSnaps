import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../classes/Colors";
import { Transition, Transitioning } from "react-native-reanimated";
import { ItemArray } from "../classes/ItemArray";
import AssignmentListItem from "./AssignmentListItem";

const AssignmentsList = ({ assignments }) => {
  const navigation = useNavigation();
  const transitionRef = React.useRef();

  const [incompletedAssignments, setIncompletedAssignments] = useState();
  const [completedAssignments, setCompletedAssignments] = useState();

  const scrollY = useRef(new Animated.Value(0)).current;

  const hiddenViewTranslation = scrollY.interpolate({
    inputRange: [-300, 0],
    outputRange: [300, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    setIncompletedAssignments(ItemArray.filter(assignments, "completed", false));
    setCompletedAssignments(ItemArray.filter(assignments, "completed", true));
  }, [assignments.length]);

  const transition = <Transition.Change interpolation="easeInOut" durationMs={400} />;

  return (
    <Transitioning.View style={{ flex: 1 }} transition={transition} ref={transitionRef}>
      <Animated.View
        style={{
          position: "absolute",
          top: -300,
          left: 0,
          right: 0,
          height: 300,
          backgroundColor: "red",
          transform: [{ translateY: hiddenViewTranslation }],
        }}
      ></Animated.View>
      <Animated.FlatList
        data={incompletedAssignments}
        keyExtractor={(index) => index.id + ""}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          return (
            <AssignmentListItem
              item={item}
              index={index}
              onPressCheckmark={() => {
                transitionRef.current.animateNextTransition();
                const newIncompletedAssignmentsArray = [...incompletedAssignments];
                newIncompletedAssignmentsArray.splice(index, 1);
                setIncompletedAssignments(newIncompletedAssignmentsArray);
                setCompletedAssignments([...completedAssignments, item]);
              }}
            />
          );
        }}
      />
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({});

export default AssignmentsList;
