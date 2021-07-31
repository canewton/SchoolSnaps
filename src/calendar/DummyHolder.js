import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DummyHolder = (props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <View style={styles.DummyDayHolder}>
        <Text style={styles.DummyDayText}>{props.day > 0 ? props.day : ""}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  DummyDayHolder: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "white",
  },

  DummyDayText: {
    color: "gainsboro",
  },
});

export default DummyHolder;
