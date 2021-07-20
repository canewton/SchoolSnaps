import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "../components/BackButton";
import FloatingActionButton from "../components/FloatingActionButton";

const NotesScreen = ({ route }) => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton color={route.params.primaryColor} />,
    });
  });
  return (
    <View style={{ flex: 1 }}>
      <Text>List Screen</Text>
      <FloatingActionButton color={route.params.primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default NotesScreen;
