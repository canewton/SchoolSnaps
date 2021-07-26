import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const WrittenNoteForm = ({ onChange, initialValues, editable }) => {
  //set default values
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);

  useEffect(() => {
    onChange(title, content);
  }, [title, content]);

  return (
    <View style={{ flex: 1, margin: 15 }}>
      <View
        style={{
          backgroundColor: initialValues.schoolClass.primaryColor,
          minHeight: 300,
          padding: 15,
          borderRadius: 10,
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
            <Text style={{ ...styles.titleInput, color: "rgba(0,0,0.0980392,.22)" }}>
              {title === "" ? "Untitled" : title}
            </Text>
            <Text style={{ ...styles.input, color: "rgba(0,0,0.0980392,.22)" }}>
              {content === "" ? "Start Typing Here..." : content}
            </Text>
            <Text>{initialValues.id}</Text>
          </View>
        )}
      </View>
    </View>
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
