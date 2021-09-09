import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from "react-native";
import { Colors } from "../classes/Colors";

const AccordionListItem = ({ title, children, pickedItem, open, setOpen, height }) => {
  const expandAndCollapseAnimation = useRef(new Animated.Value(1)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState(height);

  const bodyHeight = expandAndCollapseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight === undefined ? 500 : bodySectionHeight],
  });

  const containerColor = expandAndCollapseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"],
  });

  const toggleListItem = () => {
    if (open) {
      closeListItem();
    } else {
      openListItem();
    }
    setOpen(!open);
  };

  const closeListItem = () => {
    Animated.timing(expandAndCollapseAnimation, {
      duration: 600,
      toValue: 0,
      useNativeDriver: false,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    }).start();
  };

  const openListItem = () => {
    Animated.timing(expandAndCollapseAnimation, {
      duration: 600,
      toValue: 1,
      useNativeDriver: false,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    }).start();
  };

  useEffect(() => {
    if (open && bodyHeight === 0) {
      openListItem();
    } else if (!open && bodyHeight !== 0) {
      closeListItem();
    }
  }, [open]);

  return (
    <View style={styles.collapsibleContainer}>
      <TouchableOpacity onPress={() => toggleListItem()}>
        <Animated.View
          style={[styles.collapsibleHeader, { backgroundColor: containerColor }]}
        >
          <Text style={styles.headerText}>{title}</Text>
          {pickedItem()}
        </Animated.View>
      </TouchableOpacity>

      {open && <View style={styles.collapsibleDivider} />}

      <Animated.View style={[styles.bodyBackground, { height: bodyHeight }]}>
        <View
          style={styles.bodyContainer}
          onLayout={(event) => {
            if (height === undefined || height === null) {
              setBodySectionHeight(event.nativeEvent.layout.height);
            }
          }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};
export default AccordionListItem;

const styles = StyleSheet.create({
  bodyBackground: {
    overflow: "hidden",
    backgroundColor: "white",
  },
  bodyContainer: {
    position: "absolute",
    bottom: 0,
  },
  collapsibleHeader: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  collapsibleDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderColor,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 10,
  },
  collapsibleContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderColor,
  },
});
