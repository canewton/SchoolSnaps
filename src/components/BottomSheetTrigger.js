import React, { useState, useEffect, Children } from "react";
import { View, Text, StyleSheet, Modal, Dimensions } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const BottomSheetTrigger = ({ children }) => {
  const viewHeight = Dimensions.get("window").height;
  const [modalVisible, setModalVisible] = useState(false);
  const spaceFromTop = 40;
  const maxPos = viewHeight - spaceFromTop;
  const minPos = 0;

  const posY = useSharedValue(maxPos);
  const speed = 1.4;

  const sheetStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: posY.value }] };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    return { opacity: (maxPos - posY.value) / (maxPos - minPos) };
  });

  const openBottomSheet = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (modalVisible === true) {
      posY.value = withTiming(minPos, {
        duration: (posY.value - minPos) / speed,
      });
    }
  }, [modalVisible]);

  const stopRenderingModal = () => {
    setModalVisible(false);
  };

  useDerivedValue(() => {
    if (posY.value === maxPos) {
      runOnJS(stopRenderingModal)();
    }
  }, [posY.value]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startPos = posY.value;
    },
    onActive(event, context) {
      if (posY.value <= maxPos && posY.value >= minPos) {
        posY.value = context.startPos + event.translationY;
      }
    },
    onEnd() {
      if (posY.value > minPos + 200) {
        posY.value = withTiming(maxPos, {
          duration: (maxPos - posY.value) / speed,
        });
      } else {
        posY.value = withTiming(minPos, {
          duration: (posY.value - minPos) / speed,
        });
      }
    },
  });

  return (
    <View>
      <View>{children(openBottomSheet)}</View>
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <Animated.View
          style={[
            backgroundStyle,
            {
              flex: 1,
              backgroundColor: "black",
            },
          ]}
        >
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View
              style={[
                sheetStyle,
                {
                  position: "absolute",
                  top: spaceFromTop,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: viewHeight,
                  backgroundColor: "white",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
              ]}
            />
          </PanGestureHandler>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BottomSheetTrigger;
