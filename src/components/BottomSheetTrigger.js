import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Modal, Dimensions, Animated } from "react-native";
import {
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
  State,
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
  const sheetHeight = viewHeight - spaceFromTop;
  const closePos = sheetHeight;
  const openPos = 0;
  const dragY = new Animated.Value(0);
  const translateYOffset = new Animated.Value(closePos);
  const lastScrollY = new Animated.Value(0);
  const reverseLastScrollY = Animated.multiply(new Animated.Value(-1), lastScrollY);

  const translateY = Animated.add(
    Animated.add(dragY, reverseLastScrollY),
    translateYOffset
  ).interpolate({
    inputRange: [openPos, closePos],
    outputRange: [openPos, closePos],
    extrapolate: "clamp",
  });
  const sheetOpacity = Animated.add(
    Animated.add(dragY, reverseLastScrollY),
    translateYOffset
  ).interpolate({
    inputRange: [openPos, closePos],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const scroll = useRef();
  const sheet = useRef();
  const masterSheet = useRef();

  const [modalVisible, setModalVisible] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const sheetSpeed = 1;

  useEffect(() => {
    if (sheetIsOpen === true) {
      setModalVisible(true);
      animateBottomSheet(openPos, closePos);
    } else {
      animateBottomSheet(closePos, openPos);
    }
  }, [sheetIsOpen]);

  const openBottomSheet = () => {
    setSheetIsOpen(true);
  };

  const closeBottomSheet = () => {
    setSheetIsOpen(false);
  };

  const animateBottomSheet = (destination, translationY) => {
    Animated.timing(translateYOffset, {
      duration: (translationY - spaceFromTop) / sheetSpeed,
      toValue: destination,
      useNativeDriver: true,
    }).start(() => {
      if (destination === closePos) {
        setModalVisible(false);
      }
    });
  };

  const gestureHandler = Animated.event([{ nativeEvent: { translationY: dragY } }], {
    useNativeDriver: true,
  });

  const onRegisterLastScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: lastScrollY } } }],
    { useNativeDriver: true }
  );

  const onReleaseBottomSheet = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let { translationY } = nativeEvent;
      dragY.setValue(0);
      translateYOffset.extractOffset();
      translateYOffset.setValue(translationY);
      translateYOffset.flattenOffset();
      var sheetDestination = 0;
      if (translationY > sheetHeight / 2) {
        sheetDestination = closePos;
      }
      animateBottomSheet(sheetDestination, translationY);
    }
  };

  return (
    <View>
      <View>{children(openBottomSheet)}</View>
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <Animated.View style={[styles.background, { opacity: sheetOpacity }]}>
          <TapGestureHandler
            maxDurationMs={100000}
            ref={masterSheet}
            maxDeltaY={sheetHeight}
          >
            <Animated.View
              style={[
                { transform: [{ translateY: translateY }] },
                {
                  ...styles.bottomSheet,
                  height: sheetHeight,
                  ...sheetStyle,
                },
              ]}
            >
              <PanGestureHandler
                ref={sheet}
                simultaneousHandlers={[scroll, masterSheet]}
                onGestureEvent={gestureHandler}
                onHandlerStateChange={onReleaseBottomSheet}
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
                      onScrollBeginDrag={onRegisterLastScroll}
                      scrollEventThrottle={5}
                    >
                      {renderContent !== undefined && renderContent(closeBottomSheet)}
                    </Animated.ScrollView>
                  </NativeViewGestureHandler>
                </Animated.View>
              </PanGestureHandler>
              {headerComponent !== undefined && headerComponent(closeBottomSheet)}
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
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
  background: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default BottomSheetTrigger;
