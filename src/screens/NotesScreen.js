import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "../components/BackButton";

const NotesScreen = ({ route }) => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
    });
  });
  return (
    <View>
      <Text>List Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default NotesScreen;
