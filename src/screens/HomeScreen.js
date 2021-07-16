import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Context as ClassesContext } from "../context/ClassesContext";
import { useNavigation } from "@react-navigation/native";
import { ClassIcons } from "../icons/ClassIcons";
import { GeneralIcons } from "../icons/GeneralIcons";
import { Colors } from "../classes/Colors";
import AddButton from "../components/AddButton";

const HomeScreen = () => {
  const classes = useContext(ClassesContext);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Current");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <AddButton navigation={navigation} destination="New Class" />,
    });
  });

  const tabButtons = [{ name: "All" }, { name: "Current" }, { name: "Completed" }];

  return (
    <View style={{ flex: 1, marginBottom: 80 }}>
      <View style={{ marginLeft: 25 }}>
        <FlatList
          data={tabButtons}
          keyExtractor={(index) => index.name}
          scrollEnabled={false}
          horizontal
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => setActiveTab(item.name)}>
                {item.name === activeTab && (
                  <View style={styles.tabButton}>
                    <Text style={styles.tabText}>{item.name}</Text>
                  </View>
                )}
                {item.name !== activeTab && (
                  <View
                    style={{
                      ...styles.tabButton,
                      backgroundColor: Colors.backgroundColor,
                    }}
                  >
                    <Text style={{ ...styles.tabText, color: Colors.primaryColor }}>
                      {item.name}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
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
  tabButton: {
    marginBottom: 15,
    backgroundColor: Colors.primaryColor,
    marginRight: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
  tabText: {
    fontSize: 14,
    color: "white",
    marginVertical: 8,
    marginHorizontal: 15,
    fontWeight: "600",
  },
});

export default HomeScreen;
