import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconsList } from "./IconsList";
import { Octicons } from "@expo/vector-icons";

export class AssignmentTypeIcons extends IconsList {
  static iconList(iconSize, iconColor) {
    return [
      {
        icon: (
          <MaterialCommunityIcons
            name="note-text-outline"
            size={iconSize}
            color={iconColor}
          />
        ),
        name: "Homework",
      },
      {
        icon: <Feather name="clock" size={iconSize} color={iconColor} />,
        name: "Test",
      },
      {
        icon: <Feather name="clock" size={iconSize} color={iconColor} />,
        name: "Quiz",
      },
      {
        icon: <FontAwesome name="pencil" size={iconSize} color={iconColor} />,
        name: "Essay",
      },
      {
        icon: (
          <MaterialCommunityIcons
            name="monitor-dashboard"
            size={iconSize}
            color={iconColor}
          />
        ),
        name: "Project",
      },
      {
        icon: <Octicons name="book" size={iconSize} color={iconColor} />,
        name: "Reading",
      },
      {
        icon: <Foundation name="projection-screen" size={iconSize} color={iconColor} />,
        name: "Presentation",
      },
      {
        icon: <MaterialIcons name="library-books" size={iconSize} color={iconColor} />,
        name: "Checkpoint",
      },
    ];
  }
}
