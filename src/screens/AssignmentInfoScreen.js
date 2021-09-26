import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import HeaderIconButton from "../components/HeaderIconButton";

const AssignmentInfoScreen = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          <HeaderIconButton
            color="white"
            iconName="Back"
            callback={() => navigation.pop()}
          />
        </View>
      ),
    });
  });

  return <View></View>;
};

const styles = StyleSheet.create({});

export default AssignmentInfoScreen;
