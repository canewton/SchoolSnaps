import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import ClassForm from "../components/ClassForm";
import { Context as ClassesContext } from "../context/ClassesContext";

const ClassesEditScreen = ({ navigation, route }) => {
  const classes = useContext(ClassesContext);
  const schoolClass = route.params;
  return (
    <View>
      <ClassForm
        initialValues={schoolClass}
        onSubmit={(schoolClass) => {
          classes.edit(schoolClass);
          navigation.navigate("Notes", schoolClass);
        }}
      />
    </View>
  );
};

export default ClassesEditScreen;
