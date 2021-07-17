import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Colors } from "../classes/Colors";

const TopTabs = ({ tabButtons, callback }) => {
  const [activeTab, setActiveTab] = useState("Current");

  return (
    <View style={{ marginLeft: 25 }}>
      <FlatList
        data={tabButtons}
        keyExtractor={(index) => index.name}
        scrollEnabled={false}
        horizontal
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setActiveTab(item.name);
                callback(item.name);
              }}
            >
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
  );
};

const styles = StyleSheet.create({
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

export default TopTabs;
