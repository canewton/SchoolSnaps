import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, Dimensions } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  runOnJS,
  withDecay,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const BottomSheetTrigger = ({ children, sheetStyle, renderContent, headerComponent }) => {
  const viewHeight = Dimensions.get("window").height;
  const [modalVisible, setModalVisible] = useState(false);
  const spaceFromTop = 40;
  const maxPos = viewHeight - spaceFromTop;
  const minPos = 0;

  const posY = useSharedValue(maxPos);
  const scrollY = useSharedValue(0);
  const speed = 1.4;

  const sheetAnimatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: posY.value }] };
  });

  const renderContentAnimatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: scrollY.value }] };
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
      context.startScroll = scrollY.value;
    },
    onActive(event, context) {
      if (scrollY.value < 0 || (posY.value <= minPos && event.translationY < 0)) {
        scrollY.value = context.startScroll + event.translationY;
      } else {
        posY.value = context.startPos + event.translationY;
        if (posY.value < minPos) {
          posY.value = minPos;
        }
        if (posY.value > minPos) {
          scrollY.value = 0;
        }
      }
    },
    onEnd(event) {
      scrollY.value = withDecay({ velocity: event.velocityY, clamp: [-300, 0] });

      if (posY.value < minPos + 200) {
        posY.value = withTiming(minPos, {
          duration: ((posY.value - minPos) / speed) * 1.8,
        });
      } else {
        posY.value = withTiming(maxPos, {
          duration: (maxPos - posY.value) / speed,
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
                sheetAnimatedStyle,
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
                  overflow: "hidden",
                  ...sheetStyle,
                },
              ]}
            >
              <Animated.View style={[renderContentAnimatedStyle]}>
                <View style={{ height: 900 }}>
                  {headerComponent !== undefined ? (
                    headerComponent()
                  ) : (
                    <Text>header content not defined</Text>
                  )}
                  {renderContent !== undefined ? (
                    renderContent()
                  ) : (
                    <Text>render content not defined</Text>
                  )}
                </View>
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BottomSheetTrigger;
