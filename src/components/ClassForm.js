import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../classes/Colors";
import { ClassIcons } from "../icons/ClassIcons";
import { SchoolClass } from "../classes/SchoolClass";
import { ItemArray } from "../classes/ItemArray";
import { FontAwesome } from "@expo/vector-icons";

//get the width of the window
const windowWidth = Dimensions.get("window").width;
const colorCircleMargin = 8;
const colorColumns = 6;
const edgeMargin = 8;
//calculate all of the white space around each of the color circles
const totalColorWhiteSpace = colorColumns * colorCircleMargin * 2 + edgeMargin * 2;
//calculate the circle diameter so that all of the circles can be spaced evenly on the screen
const colorCircleDiameter = (windowWidth - totalColorWhiteSpace) / colorColumns;

const ClassForm = ({ onSubmit, initialValues }) => {
  //set default values
  const [id, setId] = useState(ItemArray.generateUniqueID());
  const [name, setName] = useState("");
  const [primaryColor, setPrimaryColor] = useState(Colors.classColors[0].primaryColor);
  const [iconName, setIconName] = useState(ClassIcons.iconList(30, "white")[0].name);

  const navigation = useNavigation();

  useEffect(() => {
    if (initialValues !== null) {
      setId(initialValues.id);
      setName(initialValues.name);
      setPrimaryColor(initialValues.primaryColor);
      setIconName(initialValues.iconName);
    }
  });

  //add a save button to the right of the header that adds a class to the context
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onSubmit(new SchoolClass(id, name, primaryColor, iconName))}
        >
          <SaveClassButton />
        </TouchableOpacity>
      ),
    });
  });

  //make a button that goes to the right of the header that saves the class being editted or added
  const SaveClassButton = () => {
    return (
      <View style={{ marginRight: 15 }}>
        <Text style={{ color: Colors.primaryColor, fontSize: 18, fontWeight: "400" }}>
          Save
        </Text>
      </View>
    );
  };

  return (
    <View>
      <TextInput
        style={{ ...styles.input, borderColor: primaryColor }}
        value={name}
        placeholder="Class Name"
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.subtitle}>Choose Color:</Text>
      <View style={{ margin: edgeMargin }}>
        {/* make a grid of colors that the user can choose from */}
        <FlatList
          data={Colors.classColors}
          keyExtractor={(index) => index.primaryColor}
          numColumns={colorColumns}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                //if this color is pressed, set the state to this color so that
                //it can be used to change the values of classes context later
                onPress={() => {
                  setPrimaryColor(item.primaryColor);
                }}
              >
                <View style={{ ...styles.color, backgroundColor: item.primaryColor }}>
                  {/* if this is the color that the user selects, put a checkmark on it */}
                  {primaryColor === item.primaryColor && (
                    <FontAwesome name="check" size={28} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <Text style={styles.subtitle}>Choose Icon:</Text>
        {/* make a grid of icons that the user can choose from */}
        <FlatList
          data={ClassIcons.iconList(25, "white")}
          keyExtractor={(index) => index.name + ""}
          numColumns={colorColumns}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                //if this icon is pressed, set the state to this icon so that
                //it can be used to change the values of classes context later
                onPress={() => {
                  setIconName(item.name);
                }}
              >
                <View
                  style={
                    //if this icon is the one that the user chooses, make it have an opacity of 1
                    //if this icon is not the one that the user chooses, make it have an opacity of .25
                    iconName === item.name
                      ? { ...styles.color, backgroundColor: primaryColor }
                      : {
                          ...styles.color,
                          backgroundColor: primaryColor,
                          opacity: 0.25,
                        }
                  }
                >
                  {/* render the icon */}
                  {item.icon}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    marginTop: 15,
    fontSize: 40,
    borderColor: Colors.primaryColor,
    marginBottom: 15,
    borderBottomWidth: 3,
  },
  color: {
    height: colorCircleDiameter,
    width: colorCircleDiameter,
    borderRadius: colorCircleDiameter / 2,
    margin: colorCircleMargin,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 10,
    color: "black",
  },
});

export default ClassForm;
