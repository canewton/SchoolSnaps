import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, LogBox } from "react-native";
import { ClassIcons } from "../icons/ClassIcons";
import { GeneralIcons } from "../icons/GeneralIcons";
import { Colors } from "../classes/Colors";
import { useNavigation } from "@react-navigation/native";
import DraggableFlatList from "react-native-draggable-flatlist";

const CoursesList = ({ classesToDisplay }) => {
  useEffect(() => {
    LogBox.ignoreLogs([
      "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary.",
    ]);
  }, []);

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        data={classesToDisplay}
        keyExtractor={(index) => index.id + ""}
        ListFooterComponent={() => <View style={{ height: 5 }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, drag, isActive }) => {
          return (
            <View style={{ ...(isActive ? Colors.shadow : styles.nonDraggableClass) }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Notes", item)}
                onLongPress={drag}
              >
                <View style={styles.classButton}>
                  <View style={styles.classIconContainer}>
                    {ClassIcons.findIcon(item.iconName, 36, item.primaryColor)}
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText}>{item.name}</Text>
                    <Text style={styles.classDetail}>0 notes</Text>
                  </View>
                  <View style={styles.arrowContainer}>
                    {GeneralIcons.findIcon(
                      "Forward",
                      20,
                      Colors.changeOpacity("#000000", 0.25)
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
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 80,
  },
  classIconContainer: {
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  textContainer: {
    marginLeft: 15,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 3,
    color: "black",
  },
  classDetail: {
    fontSize: 10,
    fontWeight: "400",
    color: "black",
  },
  arrowContainer: {
    marginRight: 15,
    alignItems: "flex-end",
    flex: 1,
  },
  nonDraggableClass: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderColor,
  },
});

export default CoursesList;
