import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Context as ClassesContext } from "../context/ClassesContext";
import { useNavigation } from "@react-navigation/native";
import { ClassIcons } from "../icons/ClassIcons";

const HomeScreen = () => {
  const classes = useContext(ClassesContext);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, marginBottom: 80 }}>
      <FlatList
        data={classes.state}
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

export default HomeScreen;
