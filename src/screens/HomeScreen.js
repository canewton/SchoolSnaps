import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Context as ClassesContext } from "../context/ClassesContext";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../components/AddButton";
import CoursesList from "../components/CoursesList";
import TopTabs from "../components/TopTabs";
import { ItemArray } from "../classes/ItemArray";

const HomeScreen = () => {
  const classes = useContext(ClassesContext);
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("Current");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddButton navigation={navigation} destination="New Class" />,
    });
  });

  const tabButtons = [{ name: "All" }, { name: "Current" }, { name: "Completed" }];

  return (
    <View style={{ flex: 1, marginBottom: 85 }}>
      <TopTabs
        tabButtons={tabButtons}
        callback={(tab) => {
          setActiveTab(tab);
        }}
      />
      {activeTab === "Current" && (
        <CoursesList classes={ItemArray.filter(classes.state, "status", "Current")} />
      )}
      {activeTab === "All" && <CoursesList classes={classes.state} />}
      {activeTab === "Completed" && (
        <CoursesList classes={ItemArray.filter(classes.state, "status", "Completed")} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
