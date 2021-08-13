import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ClassIcons } from "../icons/ClassIcons";
import { GeneralIcons } from "../icons/GeneralIcons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../classes/Colors";

const CoursesList = ({ classes }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={classes}
        keyExtractor={(index) => index.id + ""}
        ListHeaderComponent={() => <View style={{ height: 10 }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Notes", item);
                }}
              >
                <View
                  style={{
                    ...styles.classButton,
                    backgroundColor: item.primaryColor,
                  }}
                >
                  <View
                    style={{
                      ...styles.classIconContainer,
                      backgroundColor: Colors.changeOpacity("#000000", 0.1),
                    }}
                  >
                    {ClassIcons.findIcon(item.iconName, 30, "white")}
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.name}</Text>
                    <Text style={styles.classDetail}>0 notes</Text>
                  </View>
                  <View style={styles.arrowContainer}>
                    {GeneralIcons.findIcon(
                      "Forward",
                      20,
                      Colors.changeOpacity("#000000", 0.15)
                    )}
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
    ...Colors.shadow,
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
