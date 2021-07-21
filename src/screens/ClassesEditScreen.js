import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import ClassForm from "../components/ClassForm";
import { Context as ClassesContext } from "../context/ClassesContext";

const ClassesEditScreen = ({ navigation, route }) => {
  const classes = useContext(ClassesContext);
  return (
    <View>
      <ClassForm
        initialValues={route.params}
        onSubmit={(schoolClass) => {
          classes.replace(schoolClass);
          navigation.navigate("Notes", schoolClass);
        }}
      />
    </View>
  );
};

export default ClassesEditScreen;
