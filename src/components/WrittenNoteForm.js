import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../classes/Colors";
import { Keyboard } from "react-native";
import { GeneralIcons } from "../icons/GeneralIcons";

const WrittenNoteForm = ({ onSubmit, initialValues }) => {
  //set default values
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  const navigation = useNavigation();

  //add a save and cancel button on either side of the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => onSubmit(title, content)}>
          <HeaderButton name="Close" />
        </TouchableOpacity>
      ),
    });
  });

  const HeaderButton = ({ name }) => {
    return (
      <View style={{ marginHorizontal: 15 }}>
        <Text style={{ color: Colors.primaryColor, fontSize: 18, fontWeight: "400" }}>
          {name}
        </Text>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, padding: 15, backgroundColor: "black" }}>
        <View style={styles.cameraButtonsContainer}>
          <TouchableOpacity
            onPress={() => onSubmit(title, content)}
            style={styles.button}
          >
            {GeneralIcons.findIcon("Close", 28, "white")}
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: initialValues.schoolClass.primaryColor,
            minHeight: 300,
            padding: 15,
            borderRadius: 10,
          }}
        >
          <TextInput
            value={title}
            style={styles.titleInput}
            placeholder="Untitled"
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            value={content}
            style={styles.input}
            placeholder="Start Typing Here..."
            onChangeText={(text) => setContent(text)}
            multiline={true}
            scrollEnabled={false}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    minHeight: 250,
  },
  titleInput: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
  },
  cameraButtonsContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 80,
    backgroundColor: "black",
    justifyContent: "space-between",
  },
  button: {
    marginBottom: 15,
    marginHorizontal: 5,
  },
});

export default WrittenNoteForm;
