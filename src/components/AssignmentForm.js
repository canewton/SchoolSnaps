import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "../classes/Calendar";
import { Context as ClassesContext } from "../context/ClassesContext";
import { Context as CalendarContext } from "../context/CalendarContext";
import { Context as SelectedNotesContext } from "../context/SelectedNotesContext";
import { Context as NotesContext } from "../context/NotesContext";
import HorizontalScrollPicker from "./HorizontalScrollPicker";
import { AssignmentTypeIcons } from "../icons/AssignmentTypeIcons";
import AccordionListItem from "./AccordianListItem";
import CalendarDisplay from "../calendar/CalendarDisplay";
import { Assignment } from "../classes/Assignment";
import { Colors } from "../classes/Colors";
import FormBottomSheetHeader from "../components/FormBottomSheetHeader";
import BottomSheetTrigger from "./BottomSheetTrigger";
import AttachNotesForm from "./AttachNotesForm";
import NotesList from "./NotesList";
import { ItemArray } from "../classes/ItemArray";

const AssignmentForm = ({ onSubmit, initialValues, calendarData, headerTitle }) => {
  const classes = useContext(ClassesContext);
  const specialDates = useContext(CalendarContext);
  const selectedNotes = useContext(SelectedNotesContext);
  const notes = useContext(NotesContext);

  //set default values
  const [id, setId] = useState(Date.now());
  const [title, setTitle] = useState("");
  const [schoolClass, setSchoolClass] = useState(classes.state[0]);
  const [iconName, setIconName] = useState(
    AssignmentTypeIcons.iconList(30, "white")[0].name
  );
  const [date, setDate] = useState(
    Calendar.getDateFromDayData(
      specialDates.state[0].dateObject,
      calendarData.monthDataArray
    )
  );
  const [attachedNotesIDs, setAttachedNotesIDs] = useState([]);
  const [completed, setCompleted] = useState(false);

  const [classIsOpen, setClassIsOpen] = useState(true);
  const [typeIsOpen, setTypeIsOpen] = useState(true);
  const [calendarIsOpen, setCalendarIsOpen] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    if (initialValues !== null) {
      setId(initialValues.id);
      setTitle(initialValues.title);
      setSchoolClass(initialValues.schoolClass);
      setIconName(initialValues.iconName);
      setDate(new Date(initialValues.date));
      setCompleted(initialValues.completed);
      setAttachedNotesIDs(initialValues.attachedNotesIDs);
    }
  }, []);

  const AttachNotesButton = ({ onPressCallback }) => {
    return (
      <TouchableOpacity onPress={() => onPressCallback()}>
        <View
          style={{
            ...styles.textInputContainer,
            justifyContent: "center",
            marginTop: 10,
            borderBottomWidth: 0,
          }}
        >
          <Text
            style={{
              ...styles.textInputLabel,
              fontWeight: "bold",
              color: Colors.primaryColor,
            }}
          >
            Attach Notes
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const AttachedNotesList = ({ attachedNotesIDs }) => {
    const attachedNotes = attachedNotesIDs.map((noteID) =>
      ItemArray.find(notes.state, "id", noteID.id)
    );
    return (
      <View style={{ ...styles.textInputContainer, paddingLeft: 0 }}>
        {attachedNotesIDs.length <= 0 && (
          <Text
            style={{
              ...styles.textInputLabel,
              color: Colors.changeOpacity("#000000", 0.14),
              height: 100,
              marginLeft: 15,
            }}
          >
            No Notes Attached
          </Text>
        )}
        {attachedNotesIDs.length > 0 && (
          <NotesList
            notesFilteredByDate={attachedNotes}
            mode="display"
            imagesPerRow={4}
            scrollable={false}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FormBottomSheetHeader
        title={headerTitle}
        onSaveCallback={() => {
          onSubmit(
            new Assignment(
              id,
              schoolClass,
              title,
              iconName,
              date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear(),
              completed,
              attachedNotesIDs
            )
          );
        }}
      />
      <View style={{ ...styles.textInputContainer, marginTop: 10 }}>
        <Text style={styles.textInputLabel}>{"Title: "}</Text>
        <TextInput
          style={styles.input}
          value={title}
          placeholder="(Optional)"
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={{ marginBottom: 50 }} />
      <AccordionListItem
        title="Class:  "
        pickedItem={() => <Text style={styles.headerText}>{schoolClass.name}</Text>}
        open={classIsOpen}
        setOpen={(boolean) => setClassIsOpen(boolean)}
      >
        <HorizontalScrollPicker
          optionsToPick={classes.state}
          onPressCallback={(pickedItem) => {
            setSchoolClass(pickedItem);
            setClassIsOpen(false);
          }}
          currentPick={schoolClass.id}
        />
      </AccordionListItem>
      <View style={{ marginBottom: 15 }} />
      <AccordionListItem
        title="Type:  "
        pickedItem={() => <Text style={styles.headerText}>{iconName}</Text>}
        open={typeIsOpen}
        setOpen={(boolean) => setTypeIsOpen(boolean)}
      >
        <HorizontalScrollPicker
          optionsToPick={AssignmentTypeIcons.iconList(30, "black")}
          onPressCallback={(pickedItem) => {
            setIconName(pickedItem.name);
            setTypeIsOpen(false);
          }}
          currentPick={iconName}
          backgroundColor={schoolClass.primaryColor}
        />
      </AccordionListItem>
      <View style={{ marginBottom: 50 }} />
      {/* <AccordionListItem
        title="Date:  "
        pickedItem={() => (
          <Text style={styles.headerText}>
            {Calendar.monthNames[date.getMonth()] +
              " " +
              date.getDate() +
              ", " +
              date.getFullYear()}
          </Text>
        )}
        open={calendarIsOpen}
        setOpen={setCalendarIsOpen}
      >
        <View style={{ marginBottom: 25 }}>
          <CalendarDisplay
            weeksArray={calendarData.weeksArray}
            monthDataArray={calendarData.monthDataArray}
            spaceBetweenPages={Calendar.spaceBetweenPages}
            onPressCallback={(pickedItem) => {
              const monthIndexOfSelectedDate = pickedItem.monthIndex;
              const selectedDate = pickedItem.day;
              const monthOfSelectedDate =
                calendarData.monthDataArray[monthIndexOfSelectedDate].month + 1;
              const yearOfSelectedDate =
                calendarData.monthDataArray[monthIndexOfSelectedDate].year;
              setDate(
                new Date(
                  monthOfSelectedDate + "/" + selectedDate + "/" + yearOfSelectedDate
                )
              );
              setCalendarIsOpen(false);
            }}
          />
        </View>
      </AccordionListItem> */}
      <BottomSheetTrigger
        sheetStyle={{ backgroundColor: Colors.backgroundColor }}
        renderContent={() => <AttachNotesForm schoolClass={schoolClass} />}
        onSheetClose={() => selectedNotes.clear()}
        headerComponent={(closeBottomSheet) => (
          <View style={styles.attachNotesButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                setAttachedNotesIDs(selectedNotes.state);
                closeBottomSheet();
              }}
            >
              <View
                style={{
                  ...styles.attachNotesButton,
                  backgroundColor: schoolClass.primaryColor,
                }}
              >
                <Text style={{ fontSize: 18, color: "white", fontWeight: "500" }}>
                  {"Attach " + selectedNotes.state.length + " Notes"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      >
        {(openBottomSheet) => (
          <AttachNotesButton
            onPressCallback={() => {
              attachedNotesIDs.forEach((noteID) => selectedNotes.add(noteID));
              openBottomSheet();
            }}
          />
        )}
      </BottomSheetTrigger>
      <AttachedNotesList attachedNotesIDs={attachedNotesIDs} />
      <View style={{ marginBottom: 70 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginLeft: 2,
    fontSize: 16,
    fontWeight: "400",
    width: 500,
  },
  textInputLabel: { fontSize: 16, fontWeight: "400", letterSpacing: 0.5 },
  textInputContainer: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.changeOpacity("#000000", 0.14),
  },
  headerText: { fontSize: 16, fontWeight: "400", letterSpacing: 0.5 },
  attachNotesButtonContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: 80 + 56 / 2,
    width: 220,
  },
  attachNotesButton: {
    height: 56,
    width: 220,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AssignmentForm;
