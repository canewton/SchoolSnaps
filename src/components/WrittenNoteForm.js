import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const WrittenNoteForm = ({ onChange, initialValues, editable, opacity }) => {
  //set default values
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  useEffect(() => {
    onChange(title, content);
  }, [title, content]);

  return (
    <View style={{ flex: 1, margin: 15, minHeight: 250 }}>
      <View
        style={{
          ...styles.noteContainer,
          backgroundColor:
            initialValues.schoolClass.primaryColor +
            Math.round(opacity * 255).toString(16),
        }}
      >
        {editable && (
          <View>
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
        )}
        {!editable && (
          <View>
            <Text
              style={{
                ...styles.titleInput,
                color: title === "" ? "rgba(0,0,0.0980392,.22)" : "black",
              }}
            >
              {title === "" ? "Untitled" : title}
            </Text>
            <Text
              style={{
                ...styles.input,
                color: content === "" ? "rgba(0,0,0.0980392,.22)" : "black",
                marginTop: 5,
              }}
            >
              {content === "" ? "Press and hold to rearrange notes" : content}
            </Text>
          </View>
        )}
        {/* <Text>{initialValues.id}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    minHeight: 220,
  },
  titleInput: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
  },
  noteContainer: {
    minHeight: 300,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default WrittenNoteForm;
