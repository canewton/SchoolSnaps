import React from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { IconsList } from "./IconsList";

export class GeneralIcons extends IconsList {
  static iconList(iconSize, iconColor) {
    return [
      {
        icon: <Feather name="camera" size={iconSize} color={iconColor} />,
        name: "Camera",
      },
      {
        icon: <Ionicons name="trash-outline" size={iconSize} color={iconColor} />,
        name: "Delete",
      },
      {
        icon: <Ionicons name="school-outline" size={iconSize} color={iconColor} />,
        name: "Classes",
      },
      {
        icon: <Entypo name="plus" size={iconSize} color={iconColor} />,
        name: "Plus",
      },
      {
        icon: <SimpleLineIcons name="note" size={iconSize} color={iconColor} />,
        name: "Notes",
      },
      {
        icon: <Ionicons name="ios-chevron-forward" size={iconSize} color={iconColor} />,
        name: "Forward",
      },
    ];
  }
}
