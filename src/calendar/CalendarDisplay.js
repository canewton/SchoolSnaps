import React from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, Button } from "react-native";
import MonthToDisplay from "./MonthToDisplay";

const CalendarDisplay = ({
  monthDataArray,
  spaceBetweenPages,
  monthCalendarFlatListRef,
  weekCalendarFlatListRef,
}) => {
  return (
    <View>
      <Button
        title="scroll"
        onPress={() =>
          monthCalendarFlatListRef.current.scrollToIndex({ index: 0, animated: false })
        }
      />
      <FlatList
        data={monthDataArray}
        ref={monthCalendarFlatListRef}
        keyExtractor={(index) => index.month + "" + index.year}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={Dimensions.get("window").width - 20 + spaceBetweenPages}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        windowSize={10}
        renderItem={({ item, index }) => {
          return (
            <View>
              <MonthToDisplay
                style={{
                  width: Dimensions.get("window").width - 20,
                  marginRight:
                    index === monthDataArray.length - 1 ? 0 : spaceBetweenPages,
                  justifyContent: "center",
                }}
                monthData={item}
                monthIndex={index}
                weekCalendarFlatListRef={weekCalendarFlatListRef}
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
