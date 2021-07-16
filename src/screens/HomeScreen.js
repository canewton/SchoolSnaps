import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context as ClassesContext } from "../context/ClassesContext";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../components/AddButton";
import CoursesList from "../components/CoursesList";
import TopTabs from "../components/TopTabs";

const HomeScreen = () => {
  const classes = useContext(ClassesContext);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddButton navigation={navigation} destination="New Class" />,
    });
  });

  const tabButtons = [{ name: "All" }, { name: "Current" }, { name: "Completed" }];

  return (
    <View style={{ flex: 1, marginBottom: 80 }}>
      <TopTabs tabButtons={tabButtons} />
      {<CoursesList classes={classes.state} />}
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
