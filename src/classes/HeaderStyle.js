import { StyleSheet } from "react-native";
import { Colors } from "../classes/Colors";

export default class HeaderStyle {
  static classesHeaderHeight = 160;
  static assignmentsHeaderHeight = 200;
  static profileHeaderHeight = this.classesHeaderHeight;

  static styles = StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 40,
    },
    headerText: {
      color: Colors.textColor,
      fontWeight: "bold",
      fontSize: 26,
      marginLeft: 25,
    },
  });
}
