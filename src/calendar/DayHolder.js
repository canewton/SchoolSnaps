import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

const DayHolder = (props) => {
  const [dayHolderStyle, setDayHolderStyle] = useState(styles.UnchosenDayHolder);
  const [dayTextStyle, setDayTextStyle] = useState(styles.UnchosenDayText);

  const chooseDay = (index) => {
    setDayHolderStyle(styles.ChosenDayHolder);
    setDayTextStyle(styles.ChosenDayText);

    props.setCurrentCalendarDayIndex(index);
    props.setCurrentMonthIndex(props.monthIndex);
  };
  return (
    <TouchableHighlight
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
      }}
      underlayColor="transparent"
      onPress={() => chooseDay(props.calendarDayIndex)}
    >
      <View style={dayHolderStyle}>
        <Text style={dayTextStyle}>{props.day}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  UnchosenDayHolder: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "white",
  },

  UnchosenDayText: {
    color: "black",
  },

  ChosenDayHolder: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "black",
  },

  ChosenDayText: {
    color: "white",
  },
});

export default DayHolder;
