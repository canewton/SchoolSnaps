import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Modal, Dimensions } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";

const BottomSheetTrigger = ({
  children,
  sheetStyle,
  renderContent,
  headerComponent,
  onSheetClose,
}) => {
  const viewHeight = Dimensions.get("window").height;
  const spaceFromTop = 40;
  const maxPos = viewHeight - spaceFromTop;
  const minPos = 0;
  const scrollViewY = useRef(new Animated.Value(0)).current;
  const scroll = useRef();
  const sheet = useRef();
  const masterSheet = useRef();

  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolledToTop, setScrolledToTop] = useState(true);

  const posY = useSharedValue(maxPos);
  const speed = 1.4;

  const sheetAnimatedStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: posY.value }] };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    return { opacity: (maxPos - posY.value) / (maxPos - minPos) };
  });

  const onScrollToTop = (scrollYValue) => {
    if (scrollYValue === 0 && scrolledToTop === false) {
      setScrolledToTop(true);
    } else if (scrollYValue !== 0 && scrolledToTop === true) {
      setScrolledToTop(false);
    }
  };

  const openBottomSheet = () => {
    setOpen(true);
    setModalVisible(true);
  };

  const closeBottomSheet = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open === true) {
      posY.value = withTiming(minPos, {
        duration: (posY.value - minPos) / speed,
      });
    } else if (open === false) {
      posY.value = withTiming(maxPos, {
        duration: (maxPos - posY.value) / speed,
      });
    }
  }, [open]);

  const stopRenderingModal = () => {
    setModalVisible(false);
    setOpen(false);
  };

  useEffect(() => {
    if (!modalVisible) {
      if (onSheetClose !== undefined) {
        onSheetClose();
      }
    }
  }, [modalVisible]);

  useDerivedValue(() => {
    if (posY.value === maxPos) {
      runOnJS(stopRenderingModal)();
    }
  }, [posY.value]);

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart(_, context) {
        context.startPos = posY.value;
      },
      onActive(event, context) {
        posY.value = context.startPos + event.translationY;
        if (posY.value < minPos) {
          posY.value = minPos;
        }
        //console.log(scrollViewY);
      },
      onEnd() {
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
    },
    []
  );

  return (
    <View>
      <View>{children(openBottomSheet)}</View>
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <TapGestureHandler maxDurationMs={100000} ref={masterSheet} maxDeltaY={maxPos}>
          <Animated.View
            style={[
              backgroundStyle,
              {
                flex: 1,
                backgroundColor: "black",
              },
            ]}
          >
            <Animated.View
              style={[
                sheetAnimatedStyle,
                {
                  ...styles.bottomSheet,
                  top: spaceFromTop,
                  height: maxPos,
                  ...sheetStyle,
                },
              ]}
            >
              <PanGestureHandler
                ref={sheet}
                simultaneousHandlers={[scroll, masterSheet]}
                onGestureEvent={gestureHandler}
              >
                <Animated.View style={{ flex: 1 }}>
                  <NativeViewGestureHandler
                    ref={scroll}
                    simultaneousHandlers={sheet}
                    waitFor={masterSheet}
                  >
                    <Animated.ScrollView
                      style={{ flex: 1 }}
                      bounces={false}
                      onScrollBeginDrag={(event) =>
                        onScrollToTop(event.nativeEvent.contentOffset.y)
                      }
                      scrollEventThrottle={5}
                    >
                      {renderContent !== undefined && renderContent(closeBottomSheet)}
                    </Animated.ScrollView>
                  </NativeViewGestureHandler>
                </Animated.View>
              </PanGestureHandler>
              {headerComponent !== undefined && headerComponent(closeBottomSheet)}
            </Animated.View>
          </Animated.View>
        </TapGestureHandler>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    flex: 1,
  },
});

export default BottomSheetTrigger;
