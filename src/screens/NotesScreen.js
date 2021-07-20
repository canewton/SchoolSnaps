import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "../components/BackButton";
import {
  FloatingActionButton,
  FloatingButtonStyles,
} from "../components/FloatingActionButton";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";

const NotesScreen = ({ route }) => {
  const navigation = useNavigation();
  const { Popover } = renderers;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton color={route.params.primaryColor} />,
    });
  });
  return (
    <View style={{ flex: 1 }}>
      <Text>List Screen</Text>
      <View style={FloatingButtonStyles.buttonContainer}>
        <View style={FloatingButtonStyles.buttonPosition}>
          <Menu
            style={{}}
            renderer={Popover}
            rendererProps={{ anchorStyle: styles.anchorStyle }}
          >
            <MenuTrigger
              children={<FloatingActionButton color={route.params.primaryColor} />}
            />
            <MenuOptions customStyles={optionStyles}>
              <MenuOption text="Photo" />
              <MenuOption text="Note" />
              <MenuOption text="Task" />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  anchorStyle: {
    backgroundColor: "white",
    opacity: 0,
  },
});

const optionStyles = {
  optionTouchable: {
    underlayColor: "white",
    activeOpacity: 0.7,
  },
  optionWrapper: {
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    margin: 2,
  },
  optionText: {
    color: "black",
    alignSelf: "center",
    fontSize: 14,
    margin: 6,
  },
  optionsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 200,
    padding: 1,
  },
};

export default NotesScreen;
