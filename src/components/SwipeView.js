import React, { useRef, useCallback } from "react";
import { View, Text, StyleSheet, Button, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const SwipeView = () => {
  const dimensions = useWindowDimensions();

  const bottom = useSharedValue(dimensions.height);

  const style = useAnimatedStyle(() => {
    return { bottom: withSpring(bottom.value, springConfig) };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startY = bottom.value;
    },
    onActive(event, context) {
      bottom.value = context.startY - event.translationY;
    },
    onEnd() {
      if (bottom.value > dimensions.height / 2) {
        bottom.value = dimensions.height - 250;
      } else {
        bottom.value = dimensions.height / 2;
      }
    },
  });

  const springConfig = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          title="open sheet"
          onPress={() => {
            bottom.value = withSpring(dimensions.height / 2, springConfig);
          }}
        />
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
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
