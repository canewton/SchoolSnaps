import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Colors } from "../classes/Colors";
import { GeneralIcons } from "../icons/GeneralIcons";

const SettingsScreen = ({ navigation }) => {
  const profileOptions = [
    { name: "Account", destination: "" },
    { name: "Premium", destination: "" },
  ];

  const preferencesOptions = [
    { name: "Notifications", destination: "" },
    { name: "Select Class Icons", destination: "" },
    { name: "Select Note Types", destination: "" },
  ];

  const generalOptions = [
    { name: "Tutorial", destination: "" },
    { name: "Rate App", destination: "" },
    { name: "Share Feedback", destination: "" },
  ];

  const OptionsList = ({ options }) => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={options}
          keyExtractor={(item) => item.name}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            return (
              <View>
                <TouchableOpacity style={{ marginVertical: 10 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.listText}>{item.name}</Text>
                    <View style={styles.arrowContainer}>
                      {GeneralIcons.findIcon("Forward", 16, "black")}
                    </View>
                  </View>
                </TouchableOpacity>
                {index !== options.length - 1 && <View style={styles.divider} />}
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <OptionsList options={profileOptions} />
      <OptionsList options={preferencesOptions} />
      <OptionsList options={generalOptions} />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    marginHorizontal: 10,
    ...Colors.shadow,
  },
  listText: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 20,
    marginVertical: 10,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 20,
  },
  arrowContainer: {
    marginRight: 20,
    alignItems: "flex-end",
    flex: 1,
  },
});

export default SettingsScreen;
