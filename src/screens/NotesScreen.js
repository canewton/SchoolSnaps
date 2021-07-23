import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackButton from "../components/BackButton";
import FloatingActionButton from "../components/FloatingActionButton";
import { GeneralIcons } from "../icons/GeneralIcons";
import NotesList from "../components/NotesList";
import { Context as NotesContext } from "../context/NotesContext";
import RBSheet from "react-native-raw-bottom-sheet";

const NotesScreen = ({ route }) => {
  const navigation = useNavigation();
  const notes = useContext(NotesContext);
  const sheetRef = React.useRef();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton color={route.params.primaryColor} />,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            sheetRef.current.open();
          }}
          style={{ paddingRight: 15 }}
        >
          {GeneralIcons.findIcon("Three Dots", 24, route.params.primaryColor)}
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={{ flex: 1 }}>
      <NotesList notesFilteredByDate={notes.state} />
      <FloatingActionButton schoolClass={route.params} navigation={navigation} />
      <RBSheet ref={sheetRef} closeOnDragDown={false} height={290} openDuration={250}>
        <BottomSheetContent
          navigation={navigation}
          schoolClass={route.params}
          onPressButton={() => {
            sheetRef.current.close();
          }}
        />
      </RBSheet>
    </View>
  );
};

const BottomSheetContent = ({ navigation, schoolClass, onPressButton }) => {
  return (
    <View style={{ backgroundColor: "white" }}>
      <IconNextToTextButton title="Select notes" iconName="Select" />
      <IconNextToTextButton title="Filter notes" iconName="Filter" />
      <View style={styles.border} />
      <IconNextToTextButton
        title="Edit class"
        iconName="Edit"
        buttonFunction={() => {
          navigation.navigate("Edit Class", schoolClass);
          onPressButton();
        }}
      />
      <IconNextToTextButton title="Archive class" iconName="Archive" />
      <IconNextToTextButton title="Delete class" iconName="Delete" />
    </View>
  );
};

const IconNextToTextButton = ({ title, iconName, buttonFunction }) => {
  return (
    <TouchableOpacity onPress={() => buttonFunction()}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 20,
          paddingVertical: 15,
        }}
      >
        {GeneralIcons.findIcon(iconName, 20, "black")}
        <Text style={styles.bottomSheetText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 3.5,
    borderBottomColor: "#dee2e6",
  },
  bottomSheetText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "500",
    color: "#343a40",
    alignItems: "flex-start",
  },
});

export default NotesScreen;
