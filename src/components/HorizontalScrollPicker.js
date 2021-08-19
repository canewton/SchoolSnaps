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
        ListFooterComponent={<View style={{ width: 15 }} />}
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
                  <Text style={styles.classLabel}>{item.name}</Text>
                </View>
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
    height: 30,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  classLabel: {
    marginVertical: 5,
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  choiceContainer: {
    alignItems: "center",
  },
});

export default HorizontalScrollPicker;
