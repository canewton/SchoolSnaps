import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";

const WrittenNoteForm = ({ onChange, initialValues }) => {
  //set default values
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  useEffect(() => {
    onChange(title, content);
  }, [title, content]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, padding: 15 }}>
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
});

export default WrittenNoteForm;
