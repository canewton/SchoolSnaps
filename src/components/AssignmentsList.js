import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../classes/Colors";
import { Transition, Transitioning } from "react-native-reanimated";
import { ItemArray } from "../classes/ItemArray";
import AssignmentListItem from "./AssignmentListItem";

const hiddenViewHeight = 300;

const AssignmentsList = ({ assignments }) => {
  const navigation = useNavigation();
  const transitionRef = React.useRef();

  const [incompletedAssignments, setIncompletedAssignments] = useState();
  const [completedAssignments, setCompletedAssignments] = useState();
  const [pulledFarEnough, setPulledFarEnough] = useState(false);
  const [isSwithchingToAnotherList, setIsSwitchingToAnotherList] = useState(false);

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

  const handleRelease = (event) => {
    if (pulledFarEnough && !isSwithchingToAnotherList) {
      setIsSwitchingToAnotherList(true);
    }
  };

  useEffect(() => {
    setIncompletedAssignments(ItemArray.filter(assignments, "completed", false));
    setCompletedAssignments(ItemArray.filter(assignments, "completed", true));
  }, [assignments.length]);

  useEffect(() => {
    scrollY.addListener((value) => handleScroll(value, isSwithchingToAnotherList));
  }, [isSwithchingToAnotherList]);

  const transition = <Transition.Change interpolation="easeInOut" durationMs={400} />;

  return (
    <Transitioning.View style={{ flex: 1 }} transition={transition} ref={transitionRef}>
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
      <Animated.FlatList
        data={incompletedAssignments}
        keyExtractor={(index) => index.id + ""}
        showsVerticalScrollIndicator={false}
        onResponderRelease={(event) => handleRelease(event)}
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
});

export default AssignmentsList;
