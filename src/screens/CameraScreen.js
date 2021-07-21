import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import CameraButtonsContainer from "../components/CameraButtonsContainer";
import { GeneralIcons } from "../icons/GeneralIcons";

const CameraSceen = ({ route }) => {
  const navigation = useNavigation();

  //initialize state that contains whether the user can access the camera or not
  const [hasPermission, setHasPermission] = useState(null);
  //initialize state that references the expo camera
  const [cameraRef, setCameraRef] = useState(null);
  //initialize state that contains whether the phone's front camera or back camera is displayed
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recentImages, setRecentImages] = useState([]);
  const [flash, setFlash] = useState(false);

  //ask the user to access the camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //if the user does not choose if they are to grant permission or not,
  //tell them that they need to grant the app access to the camera
  if (hasPermission === null || hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const FlashButton = ({ style }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setFlash(!flash);
        }}
        style={style}
      >
        {!flash && GeneralIcons.findIcon("Flash-Off", 25, "white")}
        {flash && GeneralIcons.findIcon("Flash-On", 25, "white")}
      </TouchableOpacity>
    );
  };

  const ReverseCameraButton = ({ style }) => {
    return (
      <TouchableOpacity
        style={style}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      >
        {GeneralIcons.findIcon("Flip", 25, "white")}
      </TouchableOpacity>
    );
  };

  const CloseButton = ({ style }) => {
    return (
      <TouchableOpacity
        style={style}
        onPress={() => {
          navigation.pop();
        }}
      >
        {GeneralIcons.findIcon("Close", 28, "white")}
      </TouchableOpacity>
    );
  };

  //if the user gives the app permission to use the camera, render the following
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        flashMode={flash === true ? "on" : "off"}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View style={styles.cameraButtonsContainer}>
          <CloseButton style={styles.button} />
          <View style={{ flexDirection: "row" }}>
            <ReverseCameraButton style={styles.button} />
            <FlashButton style={styles.button} />
          </View>
        </View>
        <View style={styles.cameraWindow} />
        <CameraButtonsContainer
          schoolClass={route.params}
          capturePhotoCallback={async () => {
            if (cameraRef) {
              let photo = await cameraRef.takePictureAsync();
            }
          }}
        />
      </Camera>
    </View>
  );
};
const styles = StyleSheet.create({
  cameraButtonsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 100,
    backgroundColor: "black",
    justifyContent: "space-between",
  },
  cameraWindow: {
    flex: 1,
  },
  button: {
    marginBottom: 15,
    marginHorizontal: 20,
  },
});
export default CameraSceen;
