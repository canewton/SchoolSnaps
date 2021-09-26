import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { GeneralIcons } from "../icons/GeneralIcons";
import { useNavigation } from "@react-navigation/native";

const AssignmentListItem = ({ item, onPressCheckmark }) => {
  const navigation = useNavigation();
  const [completed, setCompleted] = useState(item.completed);
  const opacityAnimationRef = useRef(new Animated.Value(1)).current;

  //variables that allow the assignment to fade out when the checkmark is pressed
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
      {/* Assignment button that displays more assignment info when pressed */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Assignment Info", {
            name:
              item.title === ""
                ? item.schoolClass.name + " " + item.iconName
                : item.title,
            primaryColor: item.schoolClass.primaryColor,
          })
        }
        style={{
          ...styles.button,
          backgroundColor: item.schoolClass.primaryColor,
        }}
      >
        {/* Checkmark box that changes assignment properties when pressed */}
        <TouchableWithoutFeedback
          onPress={() => {
            item.toggleCompleted();
            setCompleted(item.completed);
            onPressCheckmark(Animated.timing(opacityAnimationRef, fadeAnimation));
          }}
        >
          <View
            style={{
              ...styles.checkmarkContainer,
              borderColor: item.schoolClass.primaryColor,
            }}
          >
            {/* display a checkmark if the user has pressed the box */}
            {completed && (
              <View>
                {GeneralIcons.findIcon("Check", 16, item.schoolClass.primaryColor)}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
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
    marginHorizontal: 15,
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
  checkmarkContainer: {
    height: 20,
    width: 20,
    borderRadius: 5,
    backgroundColor: "white",
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
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
  assignmentText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15,
    color: "white",
    marginVertical: 15,
  },
});

export default AssignmentListItem;
