import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import MonthToDisplay from "./MonthToDisplay";

const CalendarDisplay = ({ monthDataArray, spaceBetweenPages }) => {
  return (
    <View>
      <FlatList
        data={monthDataArray}
        keyExtractor={(index) => index.month + "" + index.year}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={Dimensions.get("window").width + spaceBetweenPages}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        windowSize={10}
        renderItem={({ item, index }) => {
          return (
            <View>
              <MonthToDisplay
                style={{
                  width: Dimensions.get("window").width,
                  marginRight:
                    index === monthDataArray.length - 1 ? 0 : spaceBetweenPages,
                  justifyContent: "center",
                }}
                monthData={item}
                monthIndex={index}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarDisplay;
