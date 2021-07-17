import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import ClassForm from "../components/ClassForm";
import { Context as ClassesContext } from "../context/ClassesContext";

const ClassesAddScreen = ({ navigation }) => {
  const classes = useContext(ClassesContext);
  return (
    <View>
      <ClassForm
        initialValues={null}
        onSubmit={(schoolClass) => {
          classes.add(schoolClass);
          navigation.pop();
        }}
      />
    </View>
  );
};

export default ClassesAddScreen;
