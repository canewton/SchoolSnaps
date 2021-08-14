import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as ClassesContext } from "../context/ClassesContext";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../components/AddButton";
import CoursesList from "../components/CoursesList";
import TopTabs from "../components/TopTabs";
import { ItemArray } from "../classes/ItemArray";
import { Colors } from "../classes/Colors";

const HomeScreen = () => {
  const classes = useContext(ClassesContext);
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("Current");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>My Courses</Text>
            <AddButton navigation={navigation} destination="New Class" />
          </View>
          <TopTabs
            tabButtons={tabButtons}
            callback={(tab) => {
              setActiveTab(tab);
            }}
          />
        </View>
      ),
    });
  });

  const tabButtons = [{ name: "All" }, { name: "Current" }, { name: "Completed" }];

  return (
    <View style={{ flex: 1, marginBottom: 85 }}>
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
  },
  headerText: {
    color: Colors.primaryColor,
    fontWeight: "bold",
    fontSize: 26,
    marginLeft: 25,
  },
});

export default HomeScreen;
