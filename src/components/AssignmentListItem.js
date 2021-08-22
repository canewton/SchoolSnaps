import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { AssignmentTypeIcons } from "../icons/AssignmentTypeIcons";
import { GeneralIcons } from "../icons/GeneralIcons";
import { Colors } from "../classes/Colors";

const AssignmentListItem = ({ item, onPressCheckmark }) => {
  const [completed, setCompleted] = useState(item.completed);
  const opacityAnimationRef = useRef(new Animated.Value(1)).current;
  const fadeAnimation = {
    duration: 800,
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
            onPressCheckmark(Animated.timing(opacityAnimationRef, fadeAnimation));
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
        <Text style={styles.assignmentText}>
          {item.schoolClass.name + " " + item.iconName}
        </Text>
      </TouchableOpacity>
    </Animated.View>
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
  assignmentText: { fontSize: 20, fontWeight: "600", marginLeft: 10, color: "white" },
});

export default AssignmentListItem;
