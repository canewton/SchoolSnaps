import React, { useRef, useCallback } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

const SwipeView = () => {
  const translationYRef = useRef(new Animated.Value(0));
  const snapPoints = [200, 600];

  const onGestureEvent = useCallback(
    Animated.event(
      [
        {
          nativeEvent: {
            translationY: translationYRef.current,
          },
        },
      ],
      { useNativeDriver: true }
    ),
    []
  );

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={{
          width: 200,
          height: 200,
          backgroundColor: "blue",
          transform: [{ translateY: translationYRef.current }],
        }}
      />
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({});

export default SwipeView;
