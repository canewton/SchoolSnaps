import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../components/AddButton";
import Calendar from "../calendar/Calendar";

const CalendarScreen = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddButton navigation={navigation} destination="New Class" />,
    });
  });

  return (
    <View>
      <Calendar />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarScreen;
