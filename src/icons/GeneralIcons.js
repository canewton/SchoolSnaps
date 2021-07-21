import React from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { IconsList } from "./IconsList";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      {
        icon: <Ionicons name="ios-chevron-back" size={iconSize} color={iconColor} />,
        name: "Back",
      },
      {
        icon: <Ionicons name="images" size={iconSize} color={iconColor} />,
        name: "Images",
      },
      {
        icon: (
          <MaterialIcons name="flip-camera-android" size={iconSize} color={iconColor} />
        ),
        name: "Flip",
      },
      {
        icon: <Ionicons name="flash-off" size={iconSize} color={iconColor} />,
        name: "Flash-Off",
      },
      {
        icon: <Ionicons name="flash" size={iconSize} color={iconColor} />,
        name: "Flash-On",
      },
      {
        icon: <Ionicons name="close-sharp" size={iconSize} color={iconColor} />,
        name: "Close",
      },
      {
        icon: (
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={iconSize}
            color={iconColor}
          />
        ),
        name: "Edit",
      },
    ];
  }
}
