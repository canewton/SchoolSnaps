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
import BottomSheetTrigger from "../components/BottomSheetTrigger";
import AssignmentForm from "../components/AssignmentForm";
import Styles from "../classes/Styles";

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
        <View style={{ height: Styles.assignmentsHeaderHeight }}>
          <View style={Styles.header.container}>
            <Text style={Styles.header.text}>Assignments</Text>
            <BottomSheetTrigger
              sheetStyle={{ backgroundColor: Colors.backgroundColor }}
              renderContent={(closeBottomSheet) => (
                <AssignmentForm
                  initialValues={null}
                  calendarData={{
                    weeksArray: weeksArray,
                    monthDataArray: monthDataArray,
                  }}
                  onSubmit={(assignmentSubmitted) => {
                    assignments.add(assignmentSubmitted);
                    closeBottomSheet();
                  }}
                  headerTitle="New Assignment"
                />
              )}
            >
              {(openBottomSheet) => (
                <AddButton onPressCallback={() => openBottomSheet()} />
              )}
            </BottomSheetTrigger>
          </View>
          <View style={{ marginBottom: 20 }} />
          <WeekdayCalendar
            weeksArray={weeksArray.slice(0, 20)}
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

const styles = StyleSheet.create({});

export default CalendarScreen;
