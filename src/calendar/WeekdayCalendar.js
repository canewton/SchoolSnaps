import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";

const WeekdayCalendar = ({
  monthDataArray,
  spaceBetweenMonths,
  setCurrentMonthIndex,
  currentMonthIndex,
}) => {
  return (
    <View>
      {/* <FlatList
        data={monthDataArray}
        keyExtractor={(index) => index.month + "" + index.year}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={Dimensions.get("window").width + spaceBetweenMonths}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        extraData={currentMonthIndex}
        windowSize={10}
        renderItem={({ item }) => {}}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default WeekdayCalendar;
