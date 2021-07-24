import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HeaderIconButton from "../components/HeaderIconButton";
import FloatingActionButton from "../components/FloatingActionButton";
import { GeneralIcons } from "../icons/GeneralIcons";
import NotesList from "../components/NotesList";
import { Context as NotesContext } from "../context/NotesContext";
import RBSheet from "react-native-raw-bottom-sheet";
import { ItemArray } from "../classes/ItemArray";

const NotesScreen = ({ route }) => {
  const navigation = useNavigation();
  const notes = useContext(NotesContext);
  const optionsSheetRef = React.useRef();
  const createSheetRef = React.useRef();

  const modes = ["browse", "select"];
  const [mode, setMode] = useState(modes[0]);
  const [itemsSelected, setItemsSelected] = useState([]);
  const notesFilteredByClass = ItemArray.filter(notes.state, "schoolClass", route.params);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          {mode === modes[0] && (
            <HeaderIconButton
              color={route.params.primaryColor}
              iconName="Back"
              callback={() => navigation.pop()}
            />
          )}
          {mode === modes[1] && (
            <HeaderIconButton
              color={route.params.primaryColor}
              iconName="Done"
              callback={() => setMode(modes[0])}
            />
          )}
        </View>
      ),
      headerRight: () => (
        <View>
          {mode === modes[0] && (
            <TouchableOpacity
              onPress={() => {
                optionsSheetRef.current.open();
              }}
              style={{ paddingRight: 15 }}
            >
              {GeneralIcons.findIcon("Three Dots", 24, route.params.primaryColor)}
            </TouchableOpacity>
          )}
          {mode === modes[1] && (
            <View style={{ flexDirection: "row" }}>
              <HeaderIconButton
                color={route.params.primaryColor}
                iconName="Plus"
                callback={() => createSheetRef.current.open()}
              />
              <HeaderIconButton
                color={route.params.primaryColor}
                iconName="Delete Outline"
                callback={() => {
                  itemsSelected.forEach((id) => notes.delete(id));
                }}
              />
            </View>
          )}
        </View>
      ),
    });
  });

  return (
    <View style={{ flex: 1 }}>
      <NotesList
        notesFilteredByDate={notesFilteredByClass}
        mode={mode}
        itemsSelectedCallback={(items) => {
          setItemsSelected(items);
        }}
      />
      {mode === modes[0] && (
        <FloatingActionButton schoolClass={route.params} navigation={navigation} />
      )}
      {/* Bottom Sheet Content */}
      <RBSheet
        ref={optionsSheetRef}
        closeOnDragDown={false}
        height={290}
        openDuration={250}
      >
        <View style={{ backgroundColor: "white" }}>
          <IconNextToTextButton
            title="Select notes"
            iconName="Select"
            buttonFunction={() => {
              setMode(modes[1]);
              optionsSheetRef.current.close();
            }}
          />
          <IconNextToTextButton title="Filter notes" iconName="Filter" />
          <View style={styles.border} />
          <IconNextToTextButton
            title="Edit class"
            iconName="Edit"
            buttonFunction={() => {
              navigation.navigate("Edit Class", route.params);
              optionsSheetRef.current.close();
            }}
          />
          <IconNextToTextButton title="Archive class" iconName="Archive" />
          <IconNextToTextButton title="Delete class" iconName="Delete" />
        </View>
      </RBSheet>
      <RBSheet
        ref={createSheetRef}
        closeOnDragDown={false}
        height={190}
        openDuration={250}
      >
        <View style={{ backgroundColor: "white" }}>
          <IconNextToTextButton title="Group notes" iconName="Group" />
          <IconNextToTextButton title="Bookmark notes" iconName="Bookmark" />
          <IconNextToTextButton title="Add to assignment" iconName="Tasks" />
        </View>
      </RBSheet>
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
