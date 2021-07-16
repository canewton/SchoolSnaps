import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ClassIcons } from "../icons/ClassIcons";
import { GeneralIcons } from "../icons/GeneralIcons";

const CoursesList = ({ classes }) => {
  return (
    <View>
      <FlatList
        data={classes}
        keyExtractor={(index) => index.id + ""}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity onPress={() => {}}>
                <View style={{ ...styles.classButton, backgroundColor: "white" }}>
                  <View
                    style={{
                      ...styles.classIconContainer,
                      backgroundColor: item.primaryColor,
                    }}
                  >
                    {ClassIcons.findIcon(item.iconName, 30, "white")}
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.name}</Text>
                    <Text style={styles.classDetail}>0 notes</Text>
                  </View>
                  <View style={styles.arrowContainer}>
                    {GeneralIcons.findIcon("Forward", 20, "#bcb8b1")}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  classButton: {
    marginBottom: 12,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
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
  textContainer: {
    marginLeft: 15,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 3,
  },
  classDetail: {
    fontSize: 10,
    fontWeight: "300",
  },
  arrowContainer: {
    marginRight: 15,
    alignItems: "flex-end",
    flex: 1,
  },
});

export default CoursesList;
