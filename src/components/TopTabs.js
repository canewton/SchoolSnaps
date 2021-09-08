import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import { Colors } from "../classes/Colors";

const TopTabs = ({ tabButtons, callback }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const highlightIndex = useRef(new Animated.Value(0)).current;
  const height = 35;

  const highlightPos = highlightIndex.interpolate({
    inputRange: [0, tabButtons.length - 1],
    outputRange: [0, (viewWidth * 2) / 3],
  });

  const animateHighlight = (tabIndex) => {
    Animated.timing(highlightIndex, {
      duration: 300,
      toValue: tabIndex,
      useNativeDriver: false,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    }).start();
  };

  useEffect(() => {
    animateHighlight(activeTabIndex);
  }, [activeTabIndex]);

  return (
    <View
      style={{ flex: 1, flexDirection: "row" }}
      onLayout={(event) => {
        setViewWidth(event.nativeEvent.layout.width);
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            height: height,
            width: viewWidth / tabButtons.length,
            backgroundColor: "white",
            borderRadius: 10,
          },
          { left: highlightPos },
        ]}
      />
      {tabButtons.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setActiveTabIndex(index);
              callback(item.name);
            }}
            key={item.name}
            style={{ flex: 1 }}
          >
            <View style={{ ...styles.tabButton, height: height }}>
              <Text style={styles.tabText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 14,
    color: Colors.headerBackgroundColor,
    marginHorizontal: 15,
    fontWeight: "600",
  },
});

export default TopTabs;
