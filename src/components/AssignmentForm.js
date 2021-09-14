import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Animated,
  Easing,
  LogBox,
} from "react-native";
import { Calendar } from "../classes/Calendar";
import { Context as ClassesContext } from "../context/ClassesContext";
import { Context as SelectedNotesContext } from "../context/SelectedNotesContext";
import { Context as NotesContext } from "../context/NotesContext";
import HorizontalScrollPicker from "./HorizontalScrollPicker";
import { AssignmentTypeIcons } from "../icons/AssignmentTypeIcons";
import AccordionListItem from "./AccordianListItem";
import { Assignment } from "../classes/Assignment";
import { Colors } from "../classes/Colors";
import FormBottomSheetHeader from "../components/FormBottomSheetHeader";
import BottomSheet from "./BottomSheet";
import AttachNotesForm from "./AttachNotesForm";
import NotesList from "./NotesList";
import { ItemArray } from "../classes/ItemArray";
import { Calendar as CalendarDisplay } from "react-native-calendars";

const AssignmentForm = ({ onSubmit, initialValues, headerTitle }) => {
  const classes = useContext(ClassesContext);
  const selectedNotes = useContext(SelectedNotesContext);
  const notes = useContext(NotesContext);

  //set default values
  const [id, setId] = useState(Date.now());
  const [title, setTitle] = useState("");
  const [schoolClass, setSchoolClass] = useState(classes.state[0]);
  const [iconName, setIconName] = useState(
    AssignmentTypeIcons.iconList(30, "white")[0].name
  );
  const [date, setDate] = useState(new Date());
  const [attachedNotesIDs, setAttachedNotesIDs] = useState([]);
  const [completed, setCompleted] = useState(false);

  const [classIsOpen, setClassIsOpen] = useState(true);
  const [typeIsOpen, setTypeIsOpen] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const bottomSheet = useRef();

  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.",
    ]);

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
            borderTopWidth: 0,
          }}
        >
          <Text style={styles.textInputLabel}>Attached Notes:</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const calendarOpacityRef = useRef(new Animated.Value(0)).current;

  const calendarOpacity = calendarOpacityRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const fadeIn = () => {
    Animated.timing(calendarOpacityRef, {
      duration: 600,
      toValue: 1,
      useNativeDriver: false,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(calendarOpacityRef, {
      duration: 600,
      toValue: 0,
      useNativeDriver: false,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    }).start(() => setShowCalendarModal(false));
  };

  useEffect(() => {
    if (showCalendar === true) {
      setShowCalendarModal(true);
      fadeIn();
    } else {
      fadeOut();
    }
  }, [showCalendar]);

  const AttachedNotesList = ({ attachedNotesIDs }) => {
    const attachedNotes = attachedNotesIDs.map((noteID) =>
      ItemArray.find(notes.state, "id", noteID.id)
    );
    return (
      <View>
        {attachedNotesIDs.length > 0 && (
          <NotesList
            notesFilteredByDate={attachedNotes}
            mode="display"
            imagesPerRow={4}
            scrollable={false}
          />
        )}
        <TouchableWithoutFeedback>
          <View style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }} />
        </TouchableWithoutFeedback>
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
              date.toLocaleDateString(),
              completed,
              attachedNotesIDs
            )
          );
        }}
      />
      {/* <View style={{ ...styles.textInputContainer, marginTop: 10 }}>
        <Text style={styles.textInputLabel}>{"Title: "}</Text>
        <TextInput
          style={styles.input}
          value={title}
          placeholder="(Optional)"
          onChangeText={(text) => setTitle(text)}
        />
      </View> */}
      {!classIsOpen && <View style={styles.collapsibleDivider} />}
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
      <TouchableOpacity
        onPress={() => setShowCalendar(true)}
        style={styles.textInputContainer}
      >
        <Text style={styles.textInputLabel}>
          {"Date:  " + Calendar.getDateInWords(date)}
        </Text>
      </TouchableOpacity>
      <AttachNotesButton
        onPressCallback={() => {
          attachedNotesIDs.forEach((noteID) => selectedNotes.add(noteID));
          bottomSheet.current.open();
        }}
      />
      <AttachedNotesList attachedNotesIDs={attachedNotesIDs} />
      {showCalendarModal && (
        <Modal transparent={true}>
          <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
            <Animated.View
              style={[
                {
                  flex: 1,
                  backgroundColor: Colors.changeOpacity("#000000", 0.8),
                  justifyContent: "center",
                },
                { opacity: calendarOpacity },
              ]}
            >
              <CalendarDisplay
                style={{ marginHorizontal: 25, padding: 10, borderRadius: 10 }}
                onDayPress={(date) => {
                  setDate(new Date(date.month + "/" + date.day + "/" + date.year));
                  setShowCalendar(false);
                }}
                markedDates={{ [date.toISOString().split("T")[0]]: { selected: true } }}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      <BottomSheet
        ref={bottomSheet}
        footerComponent={() => (
          <View style={styles.attachNotesButtonContainer}>
            <TouchableOpacity
              onPress={() => {
                setAttachedNotesIDs(selectedNotes.state);
                bottomSheet.current.close();
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
        onSheetClose={() => selectedNotes.clear()}
      >
        <AttachNotesForm schoolClass={schoolClass} />
      </BottomSheet>
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
  textInputLabel: { fontSize: 16, fontWeight: "400", marginHorizontal: 10 },
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
    bottom: 40 + 56 / 2,
    width: 220,
  },
  attachNotesButton: {
    height: 56,
    width: 220,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  collapsibleDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderColor,
  },
});

export default AssignmentForm;
