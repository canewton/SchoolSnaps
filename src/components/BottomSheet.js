import React, { Component } from "react";
import { View, StyleSheet, Modal, Dimensions, Animated } from "react-native";
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  TapGestureHandler,
  State,
  ScrollView,
} from "react-native-gesture-handler";
import { Colors } from "../classes/Colors";

const viewHeight = Dimensions.get("window").height;
const spaceFromTop = 40;
const sheetHeight = viewHeight - spaceFromTop;
const closePos = sheetHeight;
const openPos = 0;
const sheetSpeed = 1;

export default class BottomSheet extends Component {
  scroll = React.createRef();
  sheet = React.createRef();
  masterSheet = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.dragY = new Animated.Value(0);
    this.translateYOffset = new Animated.Value(closePos);
    this.lastScrollY = new Animated.Value(0);
    this.reverseLastScrollY = Animated.multiply(new Animated.Value(-1), this.lastScrollY);

    this.translateY = Animated.add(
      Animated.add(this.dragY, this.reverseLastScrollY),
      this.translateYOffset
    ).interpolate({
      inputRange: [openPos, closePos],
      outputRange: [openPos, closePos],
      extrapolate: "clamp",
    });
    this.sheetOpacity = Animated.add(
      Animated.add(this.dragY, this.reverseLastScrollY),
      this.translateYOffset
    ).interpolate({
      inputRange: [openPos, closePos],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    this.onGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this.dragY } }],
      {
        useNativeDriver: true,
      }
    );

    this.onRegisterLastScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.lastScrollY } } }],
      { useNativeDriver: true }
    );
  }

  animateBottomSheet = (destination, translationY) => {
    Animated.timing(this.translateYOffset, {
      duration: 1000,
      toValue: destination,
      useNativeDriver: true,
    }).start(() => {
      if (destination === closePos) {
        this.setState({ modalVisible: false });
      }
    });
  };

  open = () => {
    this.setState({ modalVisible: true });
    this.animateBottomSheet(openPos, closePos);
  };

  close = () => {
    this.animateBottomSheet(closePos, openPos);
  };

  onReleaseBottomSheet = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let { translationY } = nativeEvent;
      this.dragY.setValue(0);
      this.translateYOffset.extractOffset();
      this.translateYOffset.setValue(translationY);
      this.translateYOffset.flattenOffset();
      var sheetDestination = 0;
      if (translationY > sheetHeight / 2) {
        sheetDestination = closePos;
      }
      this.animateBottomSheet(sheetDestination, translationY);
    }
  };

  render() {
    const { children, headerComponent, onSheetClose } = this.props;

    const { modalVisible } = this.state;

    return (
      <View>
        <Modal animationType="none" transparent={true} visible={modalVisible}>
          <Animated.View style={[styles.background, { opacity: this.sheetOpacity }]}>
            <TapGestureHandler
              maxDurationMs={100000}
              ref={this.masterSheet}
              maxDeltaY={sheetHeight}
            >
              <Animated.View
                style={[
                  { transform: [{ translateY: this.translateY }] },
                  {
                    ...styles.bottomSheet,
                    height: sheetHeight,
                  },
                ]}
              >
                <PanGestureHandler
                  ref={this.sheet}
                  simultaneousHandlers={[this.scroll, this.masterSheet]}
                  onGestureEvent={this.onGestureEvent}
                  onHandlerStateChange={this.onReleaseBottomSheet}
                >
                  <Animated.View style={{ flex: 1 }}>
                    <NativeViewGestureHandler
                      ref={this.scroll}
                      simultaneousHandlers={this.sheet}
                      waitFor={this.masterSheet}
                    >
                      <Animated.ScrollView
                        style={{
                          backgroundColor: Colors.backgroundColor,
                        }}
                        bounces={false}
                        onScrollBeginDrag={this.onRegisterLastScroll}
                        scrollEventThrottle={5}
                        onScroll={() => console.log("ugh")}
                      >
                        {/* <View style={{ backgroundColor: "green", height: 3000 }} /> */}
                        {children !== undefined && children}
                      </Animated.ScrollView>
                    </NativeViewGestureHandler>
                  </Animated.View>
                </PanGestureHandler>
                {headerComponent !== undefined && headerComponent}
              </Animated.View>
            </TapGestureHandler>
          </Animated.View>
        </Modal>
      </View>
    );
  }
}

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
