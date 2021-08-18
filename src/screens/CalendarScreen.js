import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../components/AddButton";
import WeekdayCalendar from "../calendar/WeekdayCalendar";
import { Calendar } from "../classes/Calendar";
import { Colors } from "../classes/Colors";
import AssignmentsList from "../components/AssignmentsList";
import { Context as AssignmentContext } from "../context/AssignmentsContext";
import { Context as CalendarContext } from "../context/CalendarContext";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [monthDataArray, setMonthDataArray] = useState([]);
  const [singletonHasRun, setSingletonHasRun] = useState(false);
  const [weeksArray, setWeeksArray] = useState();

  const weekCalendarFlatListRef = React.useRef();
  const monthCalendarFlatListRef = React.useRef();

  const assignments = useContext(AssignmentContext);
  const specialDates = useContext(CalendarContext);

  if (!singletonHasRun) {
    const monthArray = Calendar.getFollowingMonths(
      Calendar.currentMonth,
      Calendar.currentYear,
      Calendar.numberOfFutureMonthsToDisplay
    );

    const dayDataArray = Calendar.getAllDaysOfTheseMonths(monthArray);
    setWeeksArray(Calendar.breakUpDaysIntoWeeks(dayDataArray));
    setMonthDataArray(monthArray);

    setSingletonHasRun(true);
  }

  useEffect(() => {
    specialDates.edit({
      id: "Selected Date",
      dateObject: Calendar.getDayDataFromDate(new Date(), weeksArray, monthDataArray),
    });
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Assignments</Text>
            <AddButton
              navigation={navigation}
              destination="New Assignment"
              propsToPass={{
                monthDataArray: monthDataArray,
                weeksArray: weeksArray,
              }}
            />
          </View>
          <WeekdayCalendar
            weeksArray={weeksArray}
            spaceBetweenPages={Calendar.spaceBetweenPages}
            weekCalendarFlatListRef={weekCalendarFlatListRef}
            marginHorizontal={10}
            todaysCalendarDayIndex={
              Calendar.getDayDataFromDate(new Date(), weeksArray, monthDataArray)
                .calendarDayIndex
            }
          />
        </View>
      ),
    });
  });

  return (
    <View style={{ flex: 1 }}>
      <AssignmentsList
        assignments={assignments.state}
        monthDataArray={monthDataArray}
        weeksArray={weeksArray}
        weekCalendarFlatListRef={weekCalendarFlatListRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
    fontSize: 26,
    marginLeft: 25,
  },
});

export default CalendarScreen;
