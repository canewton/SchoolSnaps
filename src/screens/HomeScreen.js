import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as ClassesContext } from "../context/ClassesContext";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../components/AddButton";
import CoursesList from "../components/CoursesList";
import TopTabs from "../components/TopTabs";
import { ItemArray } from "../classes/ItemArray";
import { Colors } from "../classes/Colors";
import BottomSheetTrigger from "../components/BottomSheetTrigger";
import ClassForm from "../components/ClassForm";
import HeaderStyle from "../classes/HeaderStyle";

const HomeScreen = () => {
  const classes = useContext(ClassesContext);
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("Current");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ height: HeaderStyle.classesHeaderHeight }}>
          <View style={HeaderStyle.styles.headerContainer}>
            <Text style={HeaderStyle.styles.headerText}>My Courses</Text>
            <BottomSheetTrigger
              sheetStyle={{ backgroundColor: Colors.backgroundColor }}
              renderContent={(closeBottomSheet) => (
                <ClassForm
                  initialValues={null}
                  onSubmit={(classSubmitted) => {
                    classes.add(classSubmitted);
                    closeBottomSheet();
                  }}
                  headerTitle="New Class"
                />
              )}
            >
              {(openBottomSheet) => (
                <AddButton onPressCallback={() => openBottomSheet()} />
              )}
            </BottomSheetTrigger>
          </View>
          <View style={{ marginBottom: 15 }} />
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
        <CoursesList
          classesToDisplay={ItemArray.filter(classes.state, "status", "Current")}
        />
      )}
      {activeTab === "All" && <CoursesList classesToDisplay={classes.state} />}
      {activeTab === "Completed" && (
        <CoursesList
          classesToDisplay={ItemArray.filter(classes.state, "status", "Completed")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
