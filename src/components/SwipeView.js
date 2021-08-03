import React from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const SwipeView = () => {
  const dimensions = useWindowDimensions();

  const heights = [150, 350];
  const height = useSharedValue(heights[0]);

  const style = useAnimatedStyle(() => {
    return { height: withSpring(height.value, springConfig) };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startHeight = height.value;
    },
    onActive(event, context) {
      if (height.value <= heights[1] + 10 && height.value >= heights[0] - 10) {
        height.value = context.startHeight + event.translationY;
      }
    },
    onEnd() {
      if (height.value > heights[0] + 50) {
        height.value = heights[1];
      } else {
        height.value = heights[0];
      }
    },
  });

  const springConfig = {
    damping: 1000,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 2,
    stiffness: 10000,
    mass: 100,
  };

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              width: dimensions.width,
              position: "absolute",
              backgroundColor: "white",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowRadius: 3.84,
              elevation: 5,
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
            },
            style,
          ]}
        >
          <Text>Sheet</Text>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({});

export default SwipeView;
