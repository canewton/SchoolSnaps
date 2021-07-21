import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { ClassIcons } from "../icons/ClassIcons";
import { GeneralIcons } from "../icons/GeneralIcons";

const CameraButtonsContainer = ({ capturePhotoCallback, schoolClass }) => {
  return (
    <View style={styles.cameraButtonsContainer}>
      <ViewImagesButton />
      <CapturePhotoButton capturePhotoCallback={capturePhotoCallback} />
      <ChangeClassButton schoolClass={schoolClass} />
    </View>
  );
};

const CapturePhotoButton = ({ capturePhotoCallback }) => {
  return (
    <TouchableOpacity onPress={() => capturePhotoCallback()}>
      <View style={styles.outerCameraButton}>
        <View style={styles.innerCameraButton}></View>
      </View>
    </TouchableOpacity>
  );
};

const ChangeClassButton = ({ schoolClass }) => {
  return (
    <View
      style={{
        ...styles.buttonContainer,
        backgroundColor: schoolClass.primaryColor,
        marginRight: 30,
      }}
    >
      <TouchableOpacity>
        {ClassIcons.findIcon(schoolClass.iconName, 24, "white")}
      </TouchableOpacity>
    </View>
  );
};

const ViewImagesButton = () => {
  return (
    <View
      style={{
        ...styles.buttonContainer,
        backgroundColor: "grey",
        marginLeft: 30,
      }}
    >
      <TouchableOpacity>{GeneralIcons.findIcon("Images", 24, "white")}</TouchableOpacity>
    </View>
  );
};

const capturePhotoButtonDiameter = 70;
const capturePhotoButtonRadius = capturePhotoButtonDiameter / 2;

const styles = StyleSheet.create({
  cameraButtonsContainer: {
    height: 200,
    width: Dimensions.get("window").width,
    backgroundColor: "black",
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginTop: 45,
    height: 44,
    width: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  outerCameraButton: {
    marginTop: 30,
    borderWidth: 3,
    borderRadius: capturePhotoButtonRadius,
    borderColor: "white",
    height: capturePhotoButtonDiameter,
    width: capturePhotoButtonDiameter,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCameraButton: {
    borderWidth: 2,
    borderRadius: (capturePhotoButtonDiameter - 10) / 2,
    borderColor: "white",
    height: capturePhotoButtonDiameter - 10,
    width: capturePhotoButtonDiameter - 10,
    backgroundColor: "white",
  },
});

export default CameraButtonsContainer;
