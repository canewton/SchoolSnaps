import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as ClassesContext } from "../context/ClassesContext";

const HomeScreen = () => {
  const classes = useContext(ClassesContext);
  console.log(classes);
  return (
    <View>
      <Text>Home Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
