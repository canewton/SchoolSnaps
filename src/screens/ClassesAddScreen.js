import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SchoolClass } from "../classes/SchoolClass";
import ClassForm from "../components/ClassForm";
import { Context as ClassesContext } from "../context/ClassesContext";

const ClassesAddScreen = () => {
  const classes = useContext(ClassesContext);
  return (
    <View>
      <ClassForm
        initialValues={null}
        onSubmit={(schoolClass) => {
          classes.add(schoolClass);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ClassesAddScreen;
