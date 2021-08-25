import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HeaderIconButton from "../components/HeaderIconButton";
import FloatingActionButton from "../components/FloatingActionButton";
import { GeneralIcons } from "../icons/GeneralIcons";
import NotesList from "../components/NotesList";
import { Context as NotesContext } from "../context/NotesContext";
import { Context as ClassesContext } from "../context/ClassesContext";
import { Context as SelectedNotesContext } from "../context/SelectedNotesContext";
import RBSheet from "react-native-raw-bottom-sheet";
import { ItemArray } from "../classes/ItemArray";
import { NoteGroup } from "../classes/NoteGroup";
import { WrittenNote } from "../classes/WrittenNote";
import BottomSheetTrigger from "../components/BottomSheetTrigger";
import ClassForm from "../components/ClassForm";
import { Colors } from "../classes/Colors";
import { Animated } from "react-native";

const NotesScreen = ({ route }) => {
  const navigation = useNavigation();
  const schoolClass = route.params;
  const notes = useContext(NotesContext);
  const classes = useContext(ClassesContext);
  const selectedNotes = useContext(SelectedNotesContext);
  const optionsSheetRef = React.useRef();
  const createSheetRef = React.useRef();
  const [classIsArchived, setClassIsArchived] = useState(
    schoolClass.status !== "Current"
  );

  const bottomSheetIsOpen = { value: false };

  const modes = ["browse", "select"];
  const [mode, setMode] = useState(modes[0]);
  const notesFilteredByClass = ItemArray.filter(notes.state, "schoolClass", schoolClass);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          {mode === modes[0] && (
            <HeaderIconButton
              color="white"
              iconName="Back"
              callback={() => navigation.pop()}
            />
          )}
          {mode === modes[1] && (
            <HeaderIconButton
              color="white"
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
              {GeneralIcons.findIcon("Three Dots", 24, "white")}
            </TouchableOpacity>
          )}
          {mode === modes[1] && (
            <View style={{ flexDirection: "row" }}>
              <HeaderIconButton
                color="white"
                iconName="Plus"
                callback={() => createSheetRef.current.open()}
              />
              <HeaderIconButton
                color="white"
                iconName="Delete Outline"
                callback={() => {
                  selectedNotes.state.forEach((selectedNote) => {
                    notes.delete(selectedNote.id);
                    selectedNotes.delete(selectedNote.id);
                  });
                }}
              />
            </View>
          )}
        </View>
      ),
    });
  });

  return (
    <View
      style={{
        flex: 1,
        //backgroundColor: Colors.changeOpacity(schoolClass.primaryColor, 0.5),
      }}
    >
      <NotesList
        notesFilteredByDate={notesFilteredByClass}
        mode={mode}
        imagesPerRow={2}
      />
      {mode === modes[0] && (
        <FloatingActionButton
          schoolClass={schoolClass}
          onPressPhoto={() => navigation.navigate("Camera", schoolClass)}
          onPressNote={() => {
            var note = new WrittenNote(Date.now(), schoolClass, "", "");
            notes.add(note);
            navigation.navigate("Edit Note", {
              notes: new Array(note),
              schoolClass: note.schoolClass,
              id: note.id,
            });
          }}
        />
      )}

      {/* Options Bottom Sheet Content */}
      <BottomSheetTrigger
        sheetStyle={{ backgroundColor: Colors.backgroundColor }}
        onSheetClose={() => {
          bottomSheetIsOpen.value = false;
        }}
        renderContent={(closeBottomSheet) => (
          <ClassForm
            initialValues={route.params}
            onSubmit={(classSubmitted) => {
              classes.edit(classSubmitted);
              closeBottomSheet();
            }}
            headerTitle="Edit Class"
          />
        )}
      >
        {(openBottomSheet) => (
          <RBSheet
            ref={optionsSheetRef}
            closeOnDragDown={false}
            height={290}
            openDuration={250}
            onClose={() => {
              if (bottomSheetIsOpen.value === true) {
                Animated.delay(200).start(() => openBottomSheet());
              }
            }}
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
                  bottomSheetIsOpen.value = true;
                  optionsSheetRef.current.close();
                }}
              />
              <IconNextToTextButton
                title={classIsArchived ? "Remove from archives" : "Archive class"}
                iconName="Archive"
                buttonFunction={() => {
                  classes.edit({
                    id: schoolClass.id,
                    status: classIsArchived ? "Current" : "Completed",
                  });
                  setClassIsArchived(!classIsArchived);
                  optionsSheetRef.current.close();
                }}
              />
              <IconNextToTextButton
                title="Delete class"
                iconName="Delete"
                buttonFunction={() => {
                  classes.delete(schoolClass.id);
                  optionsSheetRef.current.close();
                  navigation.pop();
                }}
              />
            </View>
          </RBSheet>
        )}
      </BottomSheetTrigger>

      {/* Create Bottom Sheet Content */}
      <RBSheet
        ref={createSheetRef}
        closeOnDragDown={false}
        height={190}
        openDuration={250}
      >
        <View style={{ backgroundColor: "white" }}>
          <IconNextToTextButton
            title="Group notes"
            iconName="Group"
            buttonFunction={() => {
              if (selectedNotes.state.length > 0) {
                var noteGroupArray = [];
                var selectedNotesArray = [...selectedNotes.state];
                selectedNotesArray.forEach((selectedNote) => {
                  const item = ItemArray.find(notes.state, "id", selectedNote.id);
                  if (item instanceof NoteGroup) {
                    noteGroupArray = [...noteGroupArray, ...item.notes];
                    selectedNotesArray = ItemArray.remove(
                      selectedNotesArray,
                      selectedNote.id
                    );
                  }
                });
                notes.add(
                  new NoteGroup(Date.now(), schoolClass, [
                    ...noteGroupArray,
                    ...selectedNotesArray.map((selectedNote) =>
                      ItemArray.find(notes.state, "id", selectedNote.id)
                    ),
                  ])
                );
                selectedNotes.state.forEach((selectedNote) => {
                  notes.delete(selectedNote.id);
                  selectedNotes.delete(selectedNote.id);
                });
              }
              createSheetRef.current.close();
            }}
          />
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
