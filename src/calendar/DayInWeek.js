import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DayInWeek = (props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "gray",
        }}
      >
        {props.day}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DayInWeek;
