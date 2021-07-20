import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { Context as ClassesContext } from "../context/ClassesContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";

const CameraSceen = ({ route }) => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton color={route.params.primaryColor} />,
    });
  });

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
  if (hasPermission === null) {
    return <Text>No access to camera</Text>;
  }
  //if the user denies permission to access camera, say that they don't have access to the camera
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
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
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setFlash(!flash);
            }}
          >
            {!flash && <Ionicons name="flash-off" size={30} color="white" />}
            {flash && <Ionicons name="flash" size={30} color="white" />}
          </TouchableOpacity>
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
        </View>
        <View style={styles.imageRack}>
          <FlatList
            data={recentImages}
            keyExtractor={(image) => image}
            horizontal
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => console.log("pressed")}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      alignSelf: "flex-start",
                    }}
                    source={{
                      uri: item,
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
          <View style={{ justifyContent: "center", flex: 1 }}>
            <TouchableOpacity>
              <Text style={[styles.editButton, { color: "gray" }]}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
};
const styles = StyleSheet.create({
  imageRack: {
    height: 50,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
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
  editButton: {
    fontSize: 16,
    alignSelf: "flex-end",
    marginRight: 15,
    fontWeight: "400",
  },
});
export default CameraSceen;
