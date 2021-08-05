import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedProps,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const SwipeView = ({ lowerHeight, upperHeight, lowerComponent, upperComponent }) => {
  const dimensions = useWindowDimensions();

  const height = useSharedValue(lowerHeight);
  const speed = 0.5;

  const sheetStyle = useAnimatedStyle(() => {
    return { height: height.value };
  });

  const upperComponentStyle = useAnimatedStyle(() => {
    return {
      opacity: (height.value - lowerHeight) / (upperHeight - lowerHeight),
      height: height.value,
    };
  });

  const upperComponentAnimatedProps = useAnimatedProps(() => {
    return { pointerEvents: height.value !== lowerHeight ? "auto" : "none" };
  });

  const lowerComponentAnimatedProps = useAnimatedProps(() => {
    return { pointerEvents: height.value !== upperHeight ? "auto" : "none" };
  });

  const lowerComponentStyle = useAnimatedStyle(() => {
    return { opacity: (upperHeight - height.value) / (upperHeight - lowerHeight) };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startHeight = height.value;
    },
    onActive(event, context) {
      if (height.value <= upperHeight && height.value >= lowerHeight) {
        height.value = context.startHeight + event.translationY;
      }
    },
    onEnd() {
      if (height.value > lowerHeight + 100) {
        height.value = withTiming(upperHeight, {
          duration: (upperHeight - height.value) / speed,
        });
      } else {
        height.value = withTiming(lowerHeight, {
          duration: (height.value - lowerHeight) / speed,
        });
      }
    },
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            sheetStyle,
            {
              margin: 10,
              backgroundColor: "white",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 3.84,
              elevation: 5,
            },
          ]}
        >
          <Animated.View
            animatedProps={lowerComponentAnimatedProps}
            style={[lowerComponentStyle, { position: "absolute" }]}
          >
            {lowerComponent}
          </Animated.View>
          <Animated.View
            animatedProps={upperComponentAnimatedProps}
            style={[upperComponentStyle, { position: "absolute" }]}
          >
            {upperComponent}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({});

export default SwipeView;
