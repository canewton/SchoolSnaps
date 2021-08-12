import React from "react";
import {
  Feather,
  Entypo,
  SimpleLineIcons,
  MaterialIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { IconsList } from "./IconsList";

export class GeneralIcons extends IconsList {
  static iconList(iconSize, iconColor) {
    return [
      {
        icon: <FontAwesome name="camera" size={iconSize} color={iconColor} />,
        name: "Camera",
      },
      {
        icon: <Ionicons name="trash" size={iconSize} color={iconColor} />,
        name: "Delete",
      },
      {
        icon: <Ionicons name="trash-outline" size={iconSize} color={iconColor} />,
        name: "Delete Outline",
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
        icon: <MaterialIcons name="edit" size={iconSize} color={iconColor} />,
        name: "Edit",
      },
      {
        icon: (
          <MaterialCommunityIcons
            name="circle-edit-outline"
            size={iconSize}
            color={iconColor}
          />
        ),
        name: "Edit Circle",
      },
      {
        icon: <Entypo name="dots-three-horizontal" size={iconSize} color={iconColor} />,
        name: "Three Dots",
      },
      {
        icon: <MaterialIcons name="filter-alt" size={iconSize} color={iconColor} />,
        name: "Filter",
      },
      {
        icon: <FontAwesome name="archive" size={iconSize} color={iconColor} />,
        name: "Archive",
      },
      {
        icon: <Entypo name="mouse-pointer" size={iconSize} color={iconColor} />,
        name: "Select",
      },
      {
        icon: <Feather name="check" size={iconSize} color={iconColor} />,
        name: "Done",
      },
      {
        icon: <Feather name="circle" size={iconSize} color={iconColor} />,
        name: "Circle",
      },
      {
        icon: (
          <Ionicons name="checkmark-circle-sharp" size={iconSize} color={iconColor} />
        ),
        name: "Checkmark Circle",
      },
      {
        icon: <Ionicons name="bookmark" size={iconSize} color={iconColor} />,
        name: "Bookmark",
      },
      {
        icon: <Ionicons name="document-attach" size={iconSize} color={iconColor} />,
        name: "Group",
      },
      {
        icon: <FontAwesome5 name="tasks" size={iconSize} color={iconColor} />,
        name: "Tasks",
      },
      {
        icon: <Ionicons name="document" size={iconSize} color={iconColor} />,
        name: "Document",
      },
      {
        icon: <MaterialIcons name="post-add" size={iconSize} color={iconColor} />,
        name: "Add Note",
      },
    ];
  }
}
