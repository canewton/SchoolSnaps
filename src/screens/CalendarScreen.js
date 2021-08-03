import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../components/AddButton";
import Calendar from "../calendar/Calendar";
import SwipeView from "../components/SwipeView";

const CalendarScreen = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddButton navigation={navigation} destination="New Class" />,
    });
  });

  return (
    <View>
      <SwipeView
        lowerHeight={150}
        upperHeight={350}
        lowerComponent={<Text style={{ marginTop: 50 }}>hi</Text>}
        upperComponent={<Calendar />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarScreen;
