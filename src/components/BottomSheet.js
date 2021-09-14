import React, { Component } from "react";
import { StyleSheet, Dimensions, Modal, View } from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetFooter,
} from "@gorhom/bottom-sheet";
import { Colors } from "../classes/Colors";

const viewHeight = Dimensions.get("window").height;
const spaceFromTop = 40;
const sheetHeight = viewHeight - spaceFromTop;
const openPos = sheetHeight;
const snapPoints = [openPos];

export default class CustomBottomSheet extends Component {
  sheetRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  open = () => {
    this.setState({ modalVisible: true }, () => {
      this.sheetRef.current.expand();
    });
  };
  close = () => {
    this.sheetRef.current.close();
  };
  render() {
    return (
      <Modal transparent={true} visible={this.state.modalVisible}>
        <BottomSheet
          ref={this.sheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={(props) => (
            <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0} {...props} />
          )}
          footerComponent={(props) => (
            <BottomSheetFooter {...props}>
              {this.props.footerComponent !== undefined && this.props.footerComponent}
            </BottomSheetFooter>
          )}
          handleComponent={() => <View />}
          onChange={(index) => {
            if (index < 0) {
              this.setState({ modalVisible: false });
            }
          }}
        >
          <BottomSheetScrollView
            style={{
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: Colors.backgroundColor,
            }}
            showsVerticalScrollIndicator={false}
          >
            {this.props.children}
          </BottomSheetScrollView>
        </BottomSheet>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({});
