import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ImageRack from "../components/ImageRack";

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

  const FlashButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setFlash(!flash);
        }}
      >
        {!flash && <Ionicons name="flash-off" size={30} color="white" />}
        {flash && <Ionicons name="flash" size={30} color="white" />}
      </TouchableOpacity>
    );
  };

  const CapturePhotoButton = () => {
    return (
      <TouchableOpacity
        onPress={async () => {
          if (cameraRef) {
            //take a picture, add it to ImageContext, and store it in asyncstorage
            let photo = await cameraRef.takePictureAsync();
          }
        }}
      >
        <View style={styles.outerCameraButton}>
          <View style={styles.innerCameraButton}></View>
        </View>
      </TouchableOpacity>
    );
  };

  const ReverseCameraButton = () => {
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      >
        <MaterialIcons name="flip-camera-android" size={30} color="white" />
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
          <FlashButton />
          <CapturePhotoButton />
          <ReverseCameraButton />
        </View>
        <ImageRack recentImages={recentImages} />
      </Camera>
    </View>
  );
};
const styles = StyleSheet.create({
  outerCameraButton: {
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCameraButton: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
  },
  cameraButtonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});
export default CameraSceen;
