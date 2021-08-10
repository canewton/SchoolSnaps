import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { AssignmentTypeIcons } from "../icons/AssignmentTypeIcons";
import { ClassIcons } from "../icons/ClassIcons";

const HorizontalScrollPicker = ({
  optionsToPick,
  currentPick,
  backgroundColor,
  onPressCallback,
}) => {
  return (
    <View>
      <FlatList
        data={optionsToPick}
        keyExtractor={(index) => {
          return index.id === undefined ? index.name : index.id + "";
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              //if this icon is pressed, set the state to this icon so that
              //it can be used to change the values of classes context later
              onPress={() => {
                onPressCallback(item);
              }}
            >
              <View style={styles.choiceContainer}>
                <View
                  style={
                    //if this icon is the one that the user chooses, make it have an opacity of 1
                    //if this icon is not the one that the user chooses, make it have an opacity of .25
                    item.id === currentPick || item.name === currentPick
                      ? [
                          styles.classCircle,
                          {
                            backgroundColor:
                              item.primaryColor === undefined
                                ? backgroundColor
                                : item.primaryColor,
                          },
                        ]
                      : [
                          styles.classCircle,
                          {
                            backgroundColor:
                              item.primaryColor === undefined
                                ? backgroundColor
                                : item.primaryColor,
                            opacity: 0.25,
                          },
                        ]
                  }
                >
                  {/* render the icon */}
                  {item.iconName === undefined
                    ? item.icon
                    : ClassIcons.findIcon(item.iconName, 30, "black")}
                </View>
                <Text style={styles.classLabel}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  classCircle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  classLabel: {
    marginTop: 5,
    marginHorizontal: 6,
    fontSize: 10,
    alignSelf: "center",
    fontWeight: "300",
    textAlign: "center",
  },
  choiceContainer: {
    width: 100,
    height: 120,
    alignItems: "center",
  },
});

export default HorizontalScrollPicker;
