import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as ClassesContext } from "../context/ClassesContext";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../components/AddButton";
import CoursesList from "../components/CoursesList";
import { ItemArray } from "../classes/ItemArray";
import { Colors } from "../classes/Colors";
import BottomSheetTrigger from "../components/BottomSheetTrigger";
import ClassForm from "../components/ClassForm";
import Styles from "../classes/Styles";

const HomeScreen = () => {
  const classes = useContext(ClassesContext);
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("Current");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ height: Styles.classesHeaderHeight }}>
          <View style={Styles.header.container}>
            <Text style={Styles.header.text}>My Courses</Text>
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
          <View style={{ marginBottom: 12.5 }} />
          <View
            style={{
              marginHorizontal: 25,
              borderRadius: 10,
              backgroundColor: Colors.changeOpacity("#ffffff", 0.25),
              height: 35,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: Colors.headerBackgroundColor,
                marginHorizontal: 15,
                fontWeight: "600",
              }}
            >
              Fall Quarter 2021
            </Text>
          </View>
        </View>
      ),
    });
  });

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
