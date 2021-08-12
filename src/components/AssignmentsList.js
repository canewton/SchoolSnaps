import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AssignmentTypeIcons } from "../icons/AssignmentTypeIcons";
import { Colors } from "../classes/Colors";

const AssignmentsList = ({ assignments, weeksArray, monthDataArray }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={assignments}
        keyExtractor={(index) => index.id + ""}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <View style={{ width: "10%" }}>
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderColor: item.schoolClass.primaryColor,
                    borderWidth: 1.5,
                    marginTop: 15,
                    marginLeft: 10,
                  }}
                ></View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Edit Assignment", {
                    assignment: item,
                    weeksArray: weeksArray,
                    monthDataArray: monthDataArray,
                  })
                }
                style={{
                  ...styles.button,
                  backgroundColor:
                    item.schoolClass.primaryColor + Math.round(0.78 * 255).toString(16),
                }}
              >
                <View
                  style={{
                    ...styles.classIconContainer,
                    backgroundColor: "#000000" + Math.round(0.1 * 255).toString(16),
                  }}
                >
                  {AssignmentTypeIcons.findIcon(item.iconName, 30, "white")}
                </View>
                <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 10 }}>
                  {item.schoolClass.name + " " + item.iconName}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    ...Colors.shadow,
  },
  classIconContainer: {
    height: 55,
    width: 55,
    borderRadius: 10,
    marginVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
});

export default AssignmentsList;
