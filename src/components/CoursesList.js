import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ClassIcons } from "../icons/ClassIcons";
import { GeneralIcons } from "../icons/GeneralIcons";
import { Colors } from "../classes/Colors";
import { useNavigation } from "@react-navigation/native";

const CoursesList = ({ classesToDisplay }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={classesToDisplay}
        keyExtractor={(index) => index.id + ""}
        ListHeaderComponent={() => <View style={{ height: 10 }} />}
        ListFooterComponent={() => <View style={{ height: 5 }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Notes", item)}>
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
                      Colors.changeOpacity("#ffffff", 0.25)
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
    fontWeight: "700",
    marginBottom: 3,
    color: "white",
  },
  classDetail: {
    fontSize: 10,
    fontWeight: "400",
    color: "white",
  },
  arrowContainer: {
    marginRight: 15,
    alignItems: "flex-end",
    flex: 1,
  },
});

export default CoursesList;
