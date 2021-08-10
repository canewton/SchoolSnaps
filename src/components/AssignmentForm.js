import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ClassIcons } from "../icons/ClassIcons";
import { Colors } from "../classes/Colors";
import { Context as ClassesContext } from "../context/ClassesContext";
import HorizontalScrollPicker from "./HorizontalScrollPicker";
import { AssignmentTypeIcons } from "../icons/AssignmentTypeIcons";
import { Transition, Transitioning } from "react-native-reanimated";

const AssignmentForm = ({ onEdit, initialValues }) => {
  const classes = useContext(ClassesContext);

  //set default values
  const [title, setTitle] = useState("");
  const [schoolClass, setSchoolClass] = useState(classes.state[0]);
  const [iconName, setIconName] = useState(ClassIcons.iconList(30, "white")[0].name);
  const [attachedNotes, setAttachedNotes] = useState([]);
  const [classIsCollapsed, setClassIsCollapsed] = useState(false);
  const [typeIsCollapsed, setTypeIsCollapsed] = useState(false);

  const collapsibleRef = React.useRef();

  const navigation = useNavigation();

  useEffect(() => {
    if (initialValues !== null) {
      setTitle(initialValues.title);
      setSchoolClass(initialValues.schoolClass);
      setIconName(initialValues.iconName);
      setAttachedNotes(initialValues.attachedNotes);
    }
  }, []);

  const transition = (
    <Transition.Together>
      <Transition.In type="fade" durationMs={200} delayMs={100} />
      <Transition.Change />
      <Transition.Out type="fade" durationMs={100} />
    </Transition.Together>
  );

  const CollapsibleHeader = ({ name, startAsCollapsed, children }) => {
    const [collapsed, setCollapsed] = useState(startAsCollapsed);

    return (
      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => {
            collapsibleRef.current.animateNextTransition();
            setCollapsed(!collapsed);
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderRadius: collapsed ? 10 : 0,
              padding: 15,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", letterSpacing: 0.5 }}>
              {name}
            </Text>
          </View>
        </TouchableOpacity>
        {!collapsed && (
          <View
            style={{
              backgroundColor: "#bcb8b1",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <View style={{}} />
            {children}
          </View>
        )}
      </View>
    );
  };

  return (
    <Transitioning.View ref={collapsibleRef} transition={transition} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <TextInput
          style={[styles.input, { borderColor: schoolClass.primaryColor }]}
          value={title}
          placeholder="Custom Title (Optional)"
          onChangeText={(text) => setTitle(text)}
        />
        <CollapsibleHeader name="Class: " startAsCollapsed={false}>
          <HorizontalScrollPicker
            optionsToPick={classes.state}
            onPressCallback={(pickedItem) => setSchoolClass(pickedItem)}
            currentPick={schoolClass.id}
          />
        </CollapsibleHeader>
        <CollapsibleHeader name="Type: " startAsCollapsed={false}>
          <HorizontalScrollPicker
            optionsToPick={AssignmentTypeIcons.iconList(30, "black")}
            onPressCallback={(pickedItem) => setIconName(pickedItem.name)}
            currentPick={iconName}
            backgroundColor={schoolClass.primaryColor}
          />
        </CollapsibleHeader>
      </ScrollView>
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    fontSize: 25,
    marginBottom: 15,
    borderBottomWidth: 3,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "300",
    marginBottom: 10,
    marginTop: 15,
    marginLeft: 10,
  },
  classCircle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 3,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  classLabel: {
    marginTop: 5,
    marginHorizontal: 6,
    fontSize: 10,
    alignSelf: "center",
    fontWeight: "300",
    textAlign: "center",
  },
  calendarButton: {
    height: 40,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  choiceContainer: {
    width: 100,
    height: 120,
    backgroundColor: "white",
    alignItems: "center",
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
});

export default AssignmentForm;
