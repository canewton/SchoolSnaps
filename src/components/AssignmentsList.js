import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AssignmentTypeIcons } from "../icons/AssignmentTypeIcons";
import { Colors } from "../classes/Colors";
import { GeneralIcons } from "../icons/GeneralIcons";
import { Transition, Transitioning } from "react-native-reanimated";
import { ItemArray } from "../classes/ItemArray";

const AssignmentsList = ({ assignments, weeksArray, monthDataArray }) => {
  const navigation = useNavigation();
  const transitionRef = React.useRef();

  const [incompletedAssignments, setIncompletedAssignments] = useState();
  const [completedAssignments, setCompletedAssignments] = useState();

  useEffect(() => {
    setIncompletedAssignments(ItemArray.filter(assignments, "completed", false));
    setCompletedAssignments(ItemArray.filter(assignments, "completed", true));
  }, [assignments.length]);

  const transition = <Transition.Change interpolation="easeInOut" durationMs={400} />;

  const Assignment = ({ item, index }) => {
    const [completed, setCompleted] = useState(item.completed);
    const opacityAnimationRef = useRef(new Animated.Value(1)).current;
    const fadeAnimation = {
      duration: 300,
      toValue: 0,
      useNativeDriver: false,
    };
    const opacity = opacityAnimationRef.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <Animated.View
        style={{ flexDirection: "row", justifyContent: "flex-end", opacity: opacity }}
      >
        <View style={{ width: "10%" }}>
          <TouchableOpacity
            onPress={() => {
              item.toggleCompleted();
              setCompleted(item.completed);
              Animated.timing(opacityAnimationRef, fadeAnimation).start(() => {
                transitionRef.current.animateNextTransition();
                const newIncompletedAssignmentsArray = [...incompletedAssignments];
                newIncompletedAssignmentsArray.splice(index, 1);
                setIncompletedAssignments(newIncompletedAssignmentsArray);
                setCompletedAssignments([...completedAssignments, item]);
              });
            }}
          >
            {!completed && (
              <View
                style={{
                  ...styles.checkmarkCircle,
                  borderColor: item.schoolClass.primaryColor,
                }}
              />
            )}
            {completed && (
              <View
                style={{
                  ...styles.checkmarkCircle,
                  borderColor: item.schoolClass.primaryColor,
                  backgroundColor: item.schoolClass.primaryColor,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {GeneralIcons.findIcon("Check", 14, "white")}
              </View>
            )}
          </TouchableOpacity>
          <View
            style={{
              ...styles.dashedLine,
              borderColor: item.schoolClass.primaryColor,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Edit Assignment", {
              assignment: item,
              weeksArray: weeksArray,
              monthDataArray: monthDataArray,
            })
          }
          style={{
            ...styles.button,
            backgroundColor: item.schoolClass.primaryColor,
          }}
        >
          <View
            style={{
              ...styles.classIconContainer,
              backgroundColor: Colors.changeOpacity("#000000", 0.1),
            }}
          >
            {AssignmentTypeIcons.findIcon(item.iconName, 30, "white")}
          </View>
          <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 10 }}>
            {item.schoolClass.name + " " + item.iconName}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Transitioning.View style={{ flex: 1 }} transition={transition} ref={transitionRef}>
      <FlatList
        data={incompletedAssignments}
        keyExtractor={(index) => index.id + ""}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return <Assignment item={item} index={index} />;
        }}
      />
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    ...Colors.shadow,
  },
  classIconContainer: {
    height: 55,
    width: 55,
    borderRadius: 10,
    marginVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  checkmarkCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    marginTop: 10,
    marginLeft: 15,
  },
  dashedLine: {
    borderWidth: 1,
    borderStyle: "dotted",
    alignSelf: "flex-end",
    marginTop: 5,
    marginRight: 15,
    height: 55,
    borderRadius: 1,
  },
});

export default AssignmentsList;
