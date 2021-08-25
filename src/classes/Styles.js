import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export default class Styles {
  static classesHeaderHeight = 160;
  static assignmentsHeaderHeight = 200;
  static profileHeaderHeight = this.classesHeaderHeight;

  static header = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 40,
    },
    text: {
      color: Colors.textColor,
      fontWeight: "bold",
      fontSize: 26,
      marginLeft: 25,
    },
  });

  static bottomSheet = StyleSheet.create({});
}
