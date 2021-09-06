import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, Dimensions } from "react-native";

const WrittenNoteForm = ({
  onChange,
  initialTitle,
  initialContent,
  editable,
  noteContainerStyle,
  titleInputStyle,
  inputStyle,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    onChange(title, content);
  }, [title, content]);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialContent, initialTitle]);

  return (
    <View style={{ ...styles.noteContainer, ...noteContainerStyle }}>
      {editable && (
        <View>
          <TextInput
            value={title}
            style={{ ...styles.titleInput, ...titleInputStyle }}
            placeholder="Untitled"
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            value={content}
            style={{ ...styles.input, ...inputStyle }}
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
  );
};

const noteHeight = Dimensions.get("window").height;
const inputBoxHeight = noteHeight * 0.7;

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    minHeight: inputBoxHeight,
  },
  titleInput: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
  },
  noteContainer: {
    minHeight: noteHeight,
    padding: 20,
    paddingBottom: 45,
    backgroundColor: "white",
  },
});

export default WrittenNoteForm;
