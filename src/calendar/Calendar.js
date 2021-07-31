import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import MonthToDisplay from "./MonthToDisplay";

const Calendar = () => {
  const [monthDataArray, setMonthDataArray] = useState([]);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const numberOfMonths = 12 * 1 + 1;

  useEffect(() => {
    getFollowingMonths(currentMonth, currentYear, numberOfMonths, []);
  }, []);

  const getFollowingMonths = (
    currentMonth,
    currentYear,
    numberOfMonths,
    monthDataArrayInput
  ) => {
    if (numberOfMonths === 0) {
      setMonthDataArray(monthDataArrayInput);
      return;
    }

    monthDataArrayInput.push({ month: currentMonth, year: currentYear });

    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear += 1;
    } else {
      currentMonth += 1;
    }

    numberOfMonths -= 1;
    getFollowingMonths(currentMonth, currentYear, numberOfMonths, monthDataArrayInput);
  };

  return (
    <View>
      <FlatList
        data={monthDataArray}
        keyExtractor={(index) => index.month + "" + index.year}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={Dimensions.get("window").width * 2}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        removeClippedSubviews={true}
        extraData={currentMonthIndex}
        windowSize={10}
        renderItem={({ item, index }) => {
          return (
            <View>
              <MonthToDisplay
                style={
                  index === monthDataArray.length - 1
                    ? {
                        //flex: 1,
                        width: Dimensions.get("window").width,
                        justifyContent: "center",
                      }
                    : {
                        //flex: 1,
                        width: Dimensions.get("window").width,
                        marginRight: Dimensions.get("window").width, //To create snapping effect
                        justifyContent: "center",
                      }
                }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Calendar;
