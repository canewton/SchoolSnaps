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
import { Colors } from "../classes/Colors";
import { ClassIcons } from "../icons/ClassIcons";
import { ItemArray } from "../classes/ItemArray";
import { FontAwesome } from "@expo/vector-icons";
import { SchoolClass } from "../classes/SchoolClass";
import AccordionListItem from "./AccordianListItem";
import FormBottomSheetHeader from "./FormBottomSheetHeader";

//get the width of the window
const windowWidth = Dimensions.get("window").width;
const optionCircleMargin = 5;
const optionColumns = 8;
const edgeMargin = 8;
//calculate all of the white space around each of the color circles
const totalColorWhiteSpace = optionColumns * optionCircleMargin * 2 + edgeMargin * 2;
//calculate the circle diameter so that all of the circles can be spaced evenly on the screen
const optionCircleDiameter = (windowWidth - totalColorWhiteSpace) / optionColumns;

const ClassForm = ({ onSubmit, initialValues, headerTitle }) => {
  //set default values
  const [id, setId] = useState(ItemArray.generateUniqueID());
  const [name, setName] = useState("");
  const [primaryColor, setPrimaryColor] = useState(Colors.classColors[0].primaryColor);
  const [iconName, setIconName] = useState(ClassIcons.iconList(30, "white")[0].name);
  const [status, setStatus] = useState("Current");

  const [colorIsOpen, setColorIsOpen] = useState(true);
  const [iconIsOpen, setIconIsOpen] = useState(true);

  useEffect(() => {
    if (initialValues !== null) {
      setId(initialValues.id);
      setName(initialValues.name);
      setPrimaryColor(initialValues.primaryColor);
      setIconName(initialValues.iconName);
      setStatus(initialValues.status);
    }
  }, []);

  const ChooseColorGrid = ({ onPressCallback }) => {
    return (
      <View style={{ margin: edgeMargin }}>
        <FlatList
          data={Colors.classColors}
          keyExtractor={(index) => index.primaryColor}
          numColumns={optionColumns}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setPrimaryColor(item.primaryColor);
                  onPressCallback();
                }}
              >
                <View style={{ ...styles.color, backgroundColor: item.primaryColor }}>
                  {/* if this is the color that the user selects, put a checkmark on it */}
                  {primaryColor === item.primaryColor && (
                    <FontAwesome name="check" size={24} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  const ChooseIconGrid = ({ onPressCallback }) => {
    return (
      <View style={{ margin: edgeMargin }}>
        <FlatList
          data={ClassIcons.iconList(22, "white")}
          keyExtractor={(index) => index.name + ""}
          numColumns={optionColumns}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setIconName(item.name);
                  onPressCallback();
                }}
              >
                <View
                  style={
                    iconName === item.name
                      ? { ...styles.color, backgroundColor: primaryColor }
                      : {
                          ...styles.color,
                          backgroundColor: primaryColor,
                          opacity: 0.25,
                        }
                  }
                >
                  {item.icon}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  return (
    <View>
      <FormBottomSheetHeader
        title={headerTitle}
        onSaveCallback={() => {
          onSubmit(new SchoolClass(id, name, primaryColor, iconName, status));
        }}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          style={{ ...styles.input, borderColor: primaryColor }}
          value={name}
          placeholder="Name Your Class"
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={{ marginBottom: 40 }} />
      {!colorIsOpen && <View style={styles.collapsibleDivider} />}
      <AccordionListItem
        title="Color:  "
        pickedItem={() => (
          <View style={{ ...styles.chosenColorCircle, backgroundColor: primaryColor }} />
        )}
        open={colorIsOpen}
        setOpen={(boolean) => setColorIsOpen(boolean)}
      >
        <ChooseColorGrid onPressCallback={() => setColorIsOpen(false)} />
      </AccordionListItem>
      <AccordionListItem
        title="Icon:  "
        pickedItem={() => <View>{ClassIcons.findIcon(iconName, 18, primaryColor)}</View>}
        open={iconIsOpen}
        setOpen={(boolean) => setIconIsOpen(boolean)}
      >
        <ChooseIconGrid onPressCallback={() => setIconIsOpen(false)} />
      </AccordionListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    fontWeight: "400",
    width: 500,
    marginLeft: 10,
  },
  color: {
    height: optionCircleDiameter,
    width: optionCircleDiameter,
    borderRadius: optionCircleDiameter / 2,
    margin: optionCircleMargin,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.changeOpacity("#000000", 0.14),
  },
  chosenColorCircle: {
    height: 20,
    width: 20,
    borderRadius: 12,
  },
  collapsibleDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderColor,
  },
});

export default ClassForm;
