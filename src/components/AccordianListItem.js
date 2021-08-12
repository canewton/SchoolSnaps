import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";

const AccordionListItem = ({ title, children, pickedItem, open, setOpen, height }) => {
  const animatedController = useRef(new Animated.Value(1)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState(height);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight === undefined ? 500 : bodySectionHeight],
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
    Animated.timing(animatedController, {
      duration: 300,
      toValue: 0,
      useNativeDriver: false,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    }).start();
  };

  const openListItem = () => {
    Animated.timing(animatedController, {
      duration: 300,
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
  }, [pickedItem]);

  return (
    <View style={styles.collapsibleContainer}>
      <TouchableWithoutFeedback onPress={() => toggleListItem()}>
        <View style={{ ...styles.collapsibleHeader, borderRadius: !open ? 10 : 10 }}>
          <Text style={styles.headerText}>{title + pickedItem}</Text>
        </View>
      </TouchableWithoutFeedback>

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
  },
  bodyContainer: {
    position: "absolute",
    bottom: 0,
  },
  collapsibleHeader: {
    padding: 15,
  },
  collapsibleDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#bcb8b1",
    marginHorizontal: 15,
  },
  headerText: { fontSize: 20, fontWeight: "600", letterSpacing: 0.5 },
  collapsibleContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
