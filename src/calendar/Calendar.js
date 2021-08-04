import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import MonthToDisplay from "./MonthToDisplay";

const Calendar = ({ monthDataArray }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const spaceBetweenMonths = 20;

  return (
    <View>
      <FlatList
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
        renderItem={({ item, index }) => {
          return (
            <View>
              <MonthToDisplay
                style={{
                  width: Dimensions.get("window").width,
                  marginRight:
                    index === monthDataArray.length - 1 ? 0 : spaceBetweenMonths,
                  justifyContent: "center",
                }}
                monthData={item}
                monthIndex={index}
                currentMonthIndex={currentMonthIndex}
                setCurrentMonthIndex={setCurrentMonthIndex}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Calendar;
