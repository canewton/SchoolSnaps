import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../classes/Colors";

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
    <View style={{ margin: 5, minHeight: 500 }}>
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
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    minHeight: 4000,
  },
  titleInput: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
  },
});

export default WrittenNoteForm;
