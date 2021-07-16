import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { IconsList } from "./IconsList";

export class BottomTabIcons extends IconsList {
  static iconList(iconSize, iconColor) {
    return [
      {
        icon: <Ionicons name="school-outline" size={iconSize} color={iconColor} />,
        name: "Classes",
      },
      {
        icon: <Ionicons name="folder" size={iconSize} color={iconColor} />,
        name: "Folders",
      },
      {
        icon: <FontAwesome5 name="calendar-check" size={iconSize} color={iconColor} />,
        name: "Planner",
      },
      {
        icon: <Entypo name="home" size={iconSize} color={iconColor} />,
        name: "Home",
      },
      {
        icon: <SimpleLineIcons name="note" size={iconSize} color={iconColor} />,
        name: "Notes",
      },
    ];
  }
}
